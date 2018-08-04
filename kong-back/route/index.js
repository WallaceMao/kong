const express = require('express')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')

const httpUtil = require('@util/httpUtil')

router.get('/', ensureLoggedIn('/401'), async (req, res) => {
  return res.json(httpUtil.success())
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
  return res.json(httpUtil.success())
})

module.exports = router