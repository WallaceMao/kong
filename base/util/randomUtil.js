const cryptoRandomString = require('crypto-random-string')
const randomString = require("randomstring")
const constant = require('../constant/constant')

const generateIdentifier = async length => {
  length = length || constant.ID_CODE_LENGTH
  return cryptoRandomString(length)
}

const generateInviteCode = async length => {
  length = length || constant.INVITE_CODE_LENGTH
  return randomString.generate({
    length: length,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  });
}

const generateValidateCode = async length => {
  length = length || constant.VALIDATE_CODE_LENGTH
  return randomString.generate({
    length: length,
    charset: '1234567890'
  });
}

module.exports.generateIdentifier = generateIdentifier
module.exports.generateValidateCode = generateValidateCode
module.exports.generateInviteCode = generateInviteCode