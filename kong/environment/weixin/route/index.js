const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

const bizWeixinService = require('../service/weixinService')
const { checkProjectValid, checkParameter } = require('@kong/validator')

router.get('/authUrl',
  async (req, res, next) => {
    try {
      const projectCode = checkProjectValid(req)
      const params = checkParameter(req, ['inviteCode'])

      const url = await bizWeixinService.getAuthUrl(projectCode, params.inviteCode)
      return res.json(httpUtil.renderResult(systemCode.OK, { authUrl: url}))
    } catch (err) {
      next(err)
    }
  })

module.exports = router