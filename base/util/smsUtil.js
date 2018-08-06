const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'yourAccessKeyId'
const secretAccessKey = 'yourAccessKeySecret'
const signName = ''
const templateCode = ''
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

const sendValidateCode = (phoneNumber, validateCode) => {
//发送短信
  const param = {code: validateCode}
  smsClient.sendSMS({
    // 必填:待发送手机号。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式；发送国际/港澳台消息时，接收号码格式为00+国际区号+号码，如“0085200000000”
    PhoneNumbers: phoneNumber,
    // 必填:短信签名-可在短信控制台中找到
    SignName: signName,
    // 必填:短信模板-可在短信控制台中找到，发送国际/港澳台消息时，请使用国际/港澳台短信模版
    TemplateCode: templateCode,
    // 可选:模板中的变量替换JSON串,如模板内容为"亲爱的${name},您的验证码为${code}"时。
    TemplateParam: JSON.stringify(param)
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
      //处理返回参数
      console.log(res)
    }
  }, function (err) {
    console.log(err)
  })
}

module.exports.sendValidateCode = sendValidateCode