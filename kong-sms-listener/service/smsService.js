const smsUtil = require('@util/smsUtil')
const constant = require('@const/constant')
const { makeError } = require('@util/errorUtil')
const bizUtil = require('@util/bizUtil')
const systemCode = require('@const/systemCode')
const bizBlackListService = require('@serv/bizBlackListService')

const sendValidateCode = async (message) => {
  const array = message.split(constant.VALIDATE_CODE_SEPARATOR)
  if(!array || array.length < 2){
    throw makeError(systemCode.SYS_ERROR, `message is ${message}`)
  }
  const phoneNumber = array[0]
  const validateCode = array[1]

  if(!bizUtil.checkPhoneNumber(phoneNumber) || !bizUtil.checkValidateCode(validateCode)){
    throw makeError(systemCode.SYS_ERROR, `phoneNumber: ${phoneNumber}, validateCode: ${validateCode}`)
  }

  //  检查是否在手机号黑名单中
  if(bizBlackListService.isIn(phoneNumber)){
    throw makeError(systemCode.BIZ_PHONE_NUMBER_IN_BLACK, `phoneNumber: ${phoneNumber}`)
  }

  //  正常发送，如果发送失败，那么就发出警告。如果是特定错误，那么就加入手机号黑名单中
  const result = await smsUtil.sendValidateCode(phoneNumber, validateCode)

  //  处理发送错误
  if(result.errcode === smsUtil.errorType.userError){
    bizBlackListService.add(phoneNumber)
  }else if(result.errcode === smsUtil.errorType.systemError){
    throw makeError(systemCode.SYS_ERROR, `phoneNumber: ${phoneNumber}, error is: ${result.errmsg}`)
  }
}

module.exports.sendValidateCode = sendValidateCode