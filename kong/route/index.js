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

router.get('/status', (req, res) => {
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
