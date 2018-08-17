const SMSClient = require('@alicloud/sms-sdk')
const config = require('config')
const systemCode = require('../constant/systemCode')
const { makeError } = require('./errorUtil')
const accessKeyId = config.sms.userId
const secretAccessKey = config.sms.secret
const signName = '活动验证'
const templateCode = 'SMS_141596578'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

const sendValidateCode = async (phoneNumber, validateCode) => {
  const param = {code: validateCode}
  const result = await smsClient.sendSMS({
    // 必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为00+国际区号+号码，如“0085200000000”
    PhoneNumbers: phoneNumber,
    // 必填:短信签名-可在短信控制台中找到
    SignName: signName,
    // 必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
    TemplateCode: templateCode,
    // 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
    TemplateParam: JSON.stringify(param)
  })
  return {
    errcode: codeErrorType[result.Code],
    errmsg: result.Code
  }
}

const errorType = {
  noError: 0,  //  表示无错误
  systemError: 1,  //  表示系统错误，与手机号无关
  userError: 2  //  表示用户手机号相关的错误，手机号会被管控，加入到黑名单中
}

const codeErrorType = {
  'OK': errorType.noError,
  'isp.RAM_PERMISSION_DENY': errorType.systemError,
  'isp.OUT_OF_SERVICE': errorType.systemError,
  'isp.PRODUCT_UN_SUBSCRIPT': errorType.systemError,
  'isp.PRODUCT_UNSUBSCRIBE': errorType.systemError,
  'isp.ACCOUNT_NOT_EXISTS': errorType.systemError,
  'isp.ACCOUNT_ABNORMAL': errorType.systemError,
  'isp.SMS_TEMPLATE_ILLEGAL': errorType.systemError,
  'isp.SMS_SIGNATURE_ILLEGAL': errorType.systemError,
  'isp.INVALID_PARAMETERS': errorType.systemError,
  'isp.SYSTEM_ERROR': errorType.systemError,
  'isp.MOBILE_NUMBER_ILLEGAL': errorType.userError,
  'isp.MOBILE_COUNT_OVER_LIMIT': errorType.systemError,
  'isp.TEMPLATE_MISSING_PARAMETERS': errorType.systemError,
  'isp.BUSINESS_LIMIT_CONTROL': errorType.systemError,
  'isp.INVALID_JSON_PARAM': errorType.systemError,
  'isp.BLACK_KEY_CONTROL_LIMIT': errorType.userError,
  'isp.PARAM_LENGTH_LIMIT': errorType.systemError,
  'isp.PARAM_NOT_SUPPORT_URL': errorType.systemError,
  'isp.AMOUNT_NOT_ENOUGH': errorType.systemError,
}

module.exports.sendValidateCode = sendValidateCode
module.exports.errorType = errorType