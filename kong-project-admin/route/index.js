const express = require('express')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')

const httpUtil = require('@util/httpUtil')
const cryptoUtil = require('@util/cryptoUtil')

router.get('/', ensureLoggedIn('/401'), async (req, res) => {
  return res.json(httpUtil.success())
})

router.get('/status', (req, res) => {
  res.json(httpUtil.success())
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
  return res.json(httpUtil.success())
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