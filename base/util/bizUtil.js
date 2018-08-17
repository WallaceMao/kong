const constant = require('../constant/constant')
const generateName = params => {
  if(params.phoneNumber && params.phoneNumber.length > 10){
    return `${params.phoneNumber.substr(0, 3)}*****${params.phoneNumber.substr(8)}`
  }
}
const checkPhoneNumber = phoneNumber => {
  const reg = /^1[0-9]{10}$/
  return reg.test(phoneNumber)
}

const checkValidateCode = validateCode => {
  return validateCode && validateCode.length === constant.VALIDATE_CODE_LENGTH
}

module.exports.generateName = generateName
module.exports.checkPhoneNumber = checkPhoneNumber
module.exports.checkValidateCode = checkValidateCode