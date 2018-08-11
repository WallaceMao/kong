const express = require('express')
const router = express.Router({mergeParams: true})

const bizWeixinService = require('../service/bizWeixinService')
const { checkParameter } = require('../../validator')

router.get('/redirect',
  async (req, res, next) => {
    try {
      const params = checkParameter(req, ['code', 'state'])
      const projectCode = params.state
      const code = params.code
      console.log('---------req.query: ' + JSON.stringify(params))

      // const weixinUser = await bizWeixinService.saveWeixinUser(projectCode, code)
      // const redirectUrl = await bizWeixinService.getWeixinFrontendIndexUrl(projectCode, weixinUser)
      const nextUrl = await bizWeixinService.saveWeixinUser(projectCode, code)
      res.redirect(redirectUrl)
    } catch (err) {
      next(err)
    }
  })

module.exports = router