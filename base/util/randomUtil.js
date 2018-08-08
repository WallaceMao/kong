const cryptoRandomString = require('crypto-random-string')
const randomString = require("randomstring")
const constant = require('../constant/constant')

const SEED_USER_CODE_PREFIX = 'sed'
const COMMON_USER_CODE_PREFIX = 'usr'
const INVITE_CODE_PREFIX = 'inv'

const generateIdentifier = async (isSeed, length) => {
  const prefix = isSeed ? SEED_USER_CODE_PREFIX : COMMON_USER_CODE_PREFIX
  length = length || constant.ID_CODE_LENGTH
  return prefix + cryptoRandomString(length)
}

const generateInviteCode = async length => {
  length = length || constant.INVITE_CODE_LENGTH
  return INVITE_CODE_PREFIX + randomString.generate({
    length: length,
    charset: 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'  //去掉容易混的“O、o、0”和“I、1、l”
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