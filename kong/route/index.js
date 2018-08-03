const express = require('express')
const router = express.Router()
const passport = require('passport')
const randomUtil = require('@util/randomUtil')
const projectDao = require('@base/dao/projectDao')
const redisUtil = require('@util/redisUtil')
const responseUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const jwtUtil = require('@util/jwtUtil')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

router.get('/redis', async (req, res) => {
  await redisUtil.setValue('hello', 'Wallace')
  const value = await redisUtil.getValue('hello')
  res.end(value)
})

router.get('/login', (req, res) => {
  res.render('login', { title: '登录'})
})

router.get('/test/save', async (req, res) => {
  const props = {
    projectName: '空投测试',
    projectCode: randomUtil.generateIdentifier(),
    defaultInviteValue: 20,
    defaultUnit: "bit"
  }
  const project = await projectDao.create(props)
  res.end(JSON.stringify(project.get({plain: true})))
})

router.get('/test/find', async (req, res, next) => {
  try {
    const list = await projectDao.findAll()
    res.json(list[0].get({plain: true}))
  } catch (err){
    next(err)
  }
})

router.get('/test/update', async (req, res) => {
  const list = await projectDao.findAll()
  list.forEach(p => {
    projectDao.update(p.id, {projectName: new Date().toString()})
  })
  res.end('success')
})

router.get('/test/delete', async (req, res) => {
  const list = await projectDao.findAll()
  list.forEach(p => {
    projectDao.deleteById(p.id)
  })
  res.end('success')
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

router.get('/test/setCookie', async (req, res, next) => {
  try {
    const token = await jwtUtil.sign({id: 1, name: 'Wallace'})
    res.cookie(jwtUtil.cookieName, token)
    res.json(responseUtil.success())
  } catch (err) {
    next(err)
  }
})

router.get('/test/getCookie', (req, res, next) => {
  try {
    res.json(responseUtil.success())
  } catch (err) {
    next(err)
  }
})

module.exports = router
