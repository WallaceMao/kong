const SMSClient = require('@alicloud/sms-sdk')
const config = require('config')
const accessKeyId = config.sms.userId
const secretAccessKey = config.sms.secret
const signName = '活动验证'
const templateCode = 'SMS_141596578'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

const sendValidateCode = async (phoneNumber, validateCode) => {
  try {
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
    if(result.Code === 'OK'){
      return 'success'
    }else{
      return 'fail'
    }
  } catch (err){
    return 'fail'
  }
}

module.exports.sendValidateCode = sendValidateCode