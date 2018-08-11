const express = require('express')
const router = express.Router({mergeParams: true})

const weixinService = require('../service/weixinService')
const { checkParameter } = require('@kong/validator')

router.get('/redirect',
  async (req, res, next) => {
    try {
      const params = checkParameter(req, ['code', 'state'])
      const projectCode = params.state
      const code = params.code
      const nextUrl = await weixinService.saveWeixinUser(projectCode, code)
      res.redirect(nextUrl)
    } catch (err) {
      next(err)
    }
  })

module.exports = router