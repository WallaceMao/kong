const config = require('config')
const RateLimit= require('express-rate-limit')
const RedisStore = require('rate-limit-redis')
const redisUtil = require('../util/redisUtil')

const rateLimitlogger = require('../../config/logConfig').rateLimitlogger
const redisClient = redisUtil.getClient('rateLimiter')

const limitReachHandler = (req, res, options) => {
  rateLimitlogger.warn(`req.ip: ${req.ip} visit req.url: ${req.url}, reached limit: ${options.name}`)
}

const keys = {
  RULE_W60_M1: 'RULE_W60_M1',
  RULE_W86400_M100: 'RULE_W86400_M100',
  RULE_W120_M5: 'RULE_W120_M5',
  RULE_W86400_M200: 'RULE_W86400_M200',
  RULE_W120_M60: 'RULE_W120_M60',
  NONE: 'NONE',
}

const rules = {
  //  适用于短信验证码的发送接口
  RULE_W60_M1: new RateLimit({
    name: 'RULE_W60_M1',
    headers: false,
    statusCode: 403,
    store: new RedisStore({
      expiry: 60,
      client: redisClient
    }),
    max: 1,  //  每个ip最大次数
    delayMs: 0,  //  没有延迟，直接禁掉
    message: 'too many requests',
    onLimitReached: limitReachHandler
  }),
  //  适用于短信验证码的发送接口
  RULE_W86400_M100: new RateLimit({
    name: 'RULE_W86400_M100',
    headers: false,
    statusCode: 403,
    store: new RedisStore({
      expiry: 24 * 60 * 60,
      client: redisClient
    }),
    // windowMs: 24 * 60 * 60 * 1000,  //  检测周期
    max: 100,  //  每个ip最大次数
    delayMs: 0,  //  没有延迟，直接禁掉
    message: 'too many requests',
    onLimitReached: limitReachHandler
  }),
  //  适用于普通登录接口
  RULE_W120_M5: new RateLimit({
    name: 'RULE_W120_M5',
    headers: false,
    statusCode: 403,
    store: new RedisStore({
      expiry: 2 * 60,
      client: redisClient
    }),
    // windowMs: 2 * 60 * 1000,  //  检测周期
    max: 5,  //  每个ip最大次数
    delayMs: 0,  //  没有延迟，直接禁掉
    message: 'too many requests',
    onLimitReached: limitReachHandler
  }),
  //  适用于普通登录接口
  RULE_W86400_M200: new RateLimit({
    name: 'RULE_W86400_M200',
    headers: false,
    statusCode: 403,
    store: new RedisStore({
      expiry: 24 * 60 * 60,
      client: redisClient
    }),
    // windowMs: 24 * 60 * 60 * 1000,  //  检测周期
    max: 200,  //  每个ip最大次数
    delayMs: 0,  //  没有延迟，直接禁掉
    message: 'too many requests',
    onLimitReached: limitReachHandler
  }),
  //  适用于普通访问接口
  RULE_W120_M60: new RateLimit({
    name: 'RULE_W120_M60',
    headers: false,
    statusCode: 403,
    store: new RedisStore({
      expiry: 2 * 60,
      client: redisClient
    }),
    // windowMs: 2 * 60 * 1000,  //  6检测周期
    max: 60,  //  每个ip最大次数
    delayMs: 0,  //  没有延迟，直接禁掉
    message: 'too many requests',
    onLimitReached: limitReachHandler
  })
}

const limit = (ruleKey) => {
  const noLimit = (req, res, next) => {
    next()
  }
  if(config.rateLimit.enabled){
    return rules[ruleKey]
  }else{
    return noLimit
  }
}

const validateCodeShort = () => {
  return rules[keys.RULE_W60_M1]
}
const validateCodeLongLimit = () => {
  return rules[keys.RULE_W86400_M100]
}
const loginShortLimit = () => {
  return rules[keys.RULE_W120_M5]
}
const loginLongLimit = () => {
  return rules[keys.RULE_W86400_M200]
}
const anonymousShortLimit = () => {
  return rules[keys.RULE_W120_M60]
}

module.exports.limit = limit
module.exports.keys = keys
module.exports.validateCodeShort = validateCodeShort
module.exports.validateCodeLongLimit = validateCodeLongLimit
module.exports.loginShortLimit = loginShortLimit
module.exports.loginLongLimit = loginLongLimit
module.exports.anonymousShortLimit = anonymousShortLimit
