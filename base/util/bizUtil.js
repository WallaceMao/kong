const generateName = params => {
  if(params.phoneNumber && params.phoneNumber.length > 10){
    return `${params.phoneNumber.substr(0, 3)}*****${params.phoneNumber.substr(8)}`
  }
}
const checkPhoneNumber = phoneNumber => {
  const reg = /^1[0-9]{10}$/
  return reg.test(phoneNumber)
}

module.exports.generateName = generateName
module.exports.checkPhoneNumber = checkPhoneNumber