const crypto = require('crypto')
const config = require('config')

const encode = async (text, algorithm, secret) => {
  const hash = crypto.createHmac(algorithm, secret)
  hash.update(text)
  return hash.digest('hex')
}

const getPasswordHash = async (password, algorithm, secret) => {
  algorithm = algorithm || config.auth.password.algorithm
  secret = secret || config.auth.password.secret
  return encode(password, algorithm, secret)
}

module.exports.getPasswordHash = getPasswordHash