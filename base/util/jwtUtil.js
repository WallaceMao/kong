const config = require('config')
const constant = require('../constant/constant')
const Promise = require('bluebird')
const jwt = Promise.promisifyAll(require('jsonwebtoken'))

const secret = config.auth.jwt.secret
const issuer = config.auth.jwt.issuer
const audience = config.auth.jwt.audience

const options = {
  issuer: issuer,
  audience: audience,
  expiresIn: constant.AUTH_JWT_EXPIRED_SECONDS
}
const sign = async obj => {
  return jwt.signAsync(obj, secret, options)
}

const verify = async token => {
  return jwt.verifyAsync(token, secret, options)
}

module.exports = {
  cookieName: constant.AUTH_JWT_COOKIE_NAME,
  secret: secret,
  issuer: issuer,
  audience: audience,
  sign: sign,
  verify: verify
}