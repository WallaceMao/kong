const express = require('express')
const passport = require('passport')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})
const { ensureLoggedIn } = require('connect-ensure-login')

const httpUtil = require('@util/httpUtil')
const cryptoUtil = require('@util/cryptoUtil')

/**
 * 项目管理员登陆
 */
router.post('/login',
  passport.authenticate('local'),
  async (req, res, next) => {
    try {
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

/**
 * 项目管理员登出
 */
router.post('/logout',
  ensureLoggedIn('/401'),
  async (req, res, next) => {
    try {
      await req.logout()
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

/**
 * 生成password的hash方法，正式环境下移除
 * @deprecated
 */
router.get('/password-hash',
  async (req, res, next) => {
    try {
      const hash = await cryptoUtil.getPasswordHash('123456')
      return res.json(httpUtil.renderResult(0, {hash: hash}))
    } catch (err) {
      next(err)
    }
  })

module.exports = router