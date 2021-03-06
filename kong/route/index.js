const express = require('express')
const router = express.Router()
const passport = require('passport')
const randomUtil = require('@util/randomUtil')
const redisUtil = require('@util/redisUtil')
const responseUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const httpUtil = require('@util/httpUtil')

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
    const str = await randomUtil.generateValidateCode()
    res.json(responseUtil.renderResult(systemCode.OK, {code: str}))
  }catch (err){
    next(err)
  }
})

module.exports = router
