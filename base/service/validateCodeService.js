const config = require('config')
const constant = require('../constant/constant')
const validateCodeUtil = require('../util/validateCodeUtil')
const randomUtil = require('../util/randomUtil')
const mqPublisher = require('../mq/mqPublisher')

/**
 * 处理验证码：
 * 1  生成验证码
 * 2  保存到redis中（注意需要有实效时间）
 * 3  将手机号以及要发送的信息插入到消息队列
 * 4  消息队列的监听程序，监听到消息队列插入消息处理是否发送
 * 本方法主要执行前三步
 * @param phoneNumber
 * @returns {Promise<void>}
 */
const handleValidateCode = async phoneNumber => {
  if(!config.sms.enabled){
    return
  }
  //  如果redis中已存在，那么使用redis中的验证码
  let code = await validateCodeUtil.getValidateCode(phoneNumber)
  if(!code){
    code = await randomUtil.generateValidateCode()
    await validateCodeUtil.saveValidateCode(phoneNumber, code)
  }
  await mqPublisher.send(`${phoneNumber}${constant.VALIDATE_CODE_SEPARATOR}${code}`)
}

const checkValidateCode = async (phoneNumber, validateCode) => {
  if(!config.sms.enabled){
    return true
  }
  const dbCode = await validateCodeUtil.getValidateCode(phoneNumber)
  return (dbCode && dbCode === validateCode)
}

module.exports.handleValidateCode = handleValidateCode
module.exports.checkValidateCode = checkValidateCode