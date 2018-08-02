const express = require('express')
const passport = require('passport')
const router = express.Router()

/**
 * 项目管理员登陆
 */
router.post('/login',
  async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

router.post('/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
  try {

  } catch (err) {
    next(err)
  }
})

module.exports = router