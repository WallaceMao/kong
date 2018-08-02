const redisUtil = require('../util/redisUtil')

const constant = require('../constant/constant')

const client = redisUtil.getClient('validateCode')

const saveValidateCode = async (key, value, expireIn) => {
  expireIn = expireIn || constant.VALIDATE_CODE_EXPIRED_SECONDS
  return client.set(key, value, 'EX', expireIn)
}
const getValidateCode = async (key) => {
  return client.getAsync(key)
}

module.exports.saveValidateCode = saveValidateCode
module.exports.getValidateCode = getValidateCode