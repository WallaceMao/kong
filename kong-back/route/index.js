const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureLoggedIn } = require('connect-ensure-login')

const httpUtil = require('@util/httpUtil')

router.get('/', ensureLoggedIn('/401'), async (req, res) => {
  console.log('====' + JSON.stringify(req.user))
  return res.json(httpUtil.success())
})

router.post('/login', passport.authenticate('local'), async (req, res) => {
  return res.json(httpUtil.success())
})

router.get('/forbidden', async (req, res) => {
  res.status(404).json({errcode: 'not found'})
})

module.exports = router