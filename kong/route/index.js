const express = require('express')
const router = express.Router()
const passport = require('passport')
const randomUtil = require('@util/randomUtil')
const redisUtil = require('@util/redisUtil')
const responseUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const jwtUtil = require('@util/jwtUtil')
const httpUtil = require('@util/httpUtil')
const rateLimiter = require('@base/rate-limiter')

/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index', { title: 'Express' })
// })

const RateLimit= require('express-rate-limit')

const limiter = new RateLimit({
  headers: false,
  statusCode: 401,
  windowMs: 60 * 1000,  //  60s作为一个检测周期
  max: 3,  //  每个ip最大次数为5次
  // delayAfter: 2,  //  在多少个之后延迟
  delayMs: 0,  //  没有延迟，直接禁掉
  handler: (req, res) => {
    console.log('==handler req.ip: ' + req.ip)
  },
  onLimitReached: (req, res) => {
    console.log('==onLimitReached req.ip: ' + req.ip)
  }
})

router.get('/status', rateLimiter.limit(rateLimiter.keys.RULE_W60_M1), (req, res) => {
  res.json(httpUtil.success())
})

router.get('/redis', async (req, res) => {
  await redisUtil.setValue('hello', 'Wallace')
  const value = await redisUtil.getValue('hello')
  res.end(value)
})

router.get('/login', (req, res) => {
  res.render('login', { title: '登录'})
})

router.get('/test', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    console.log('req.user: ' + JSON.stringify(req.user))
    const str = await randomUtil.generateValidateCode()
    res.json(responseUtil.renderResult(systemCode.OK, {code: str}))
  }catch (err){
    next(err)
  }
})

module.exports = router
