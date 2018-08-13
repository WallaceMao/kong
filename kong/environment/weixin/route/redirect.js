const express = require('express')
const router = express.Router({mergeParams: true})

const weixinService = require('../service/weixinService')
const { checkParameter } = require('@kong/validator')

router.get('/redirect',
  async (req, res, next) => {
    try {
      const params = checkParameter(req, ['code', 'state'])
      const state = params.state
      const code = params.code
      const nextUrl = await weixinService.saveWeixinUser(state, code)
      res.redirect(nextUrl)
    } catch (err) {
      next(err)
    }
  })

module.exports = router