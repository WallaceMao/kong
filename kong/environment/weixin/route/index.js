const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

const weixinService = require('../service/weixinService')
const { checkProjectValid, checkParameter } = require('@kong/validator')

router.get('/authUrl',
  async (req, res, next) => {
    try {
      const projectCode = checkProjectValid(req)
      const params = checkParameter(req, ['inviteCode'])

      const url = await weixinService.getAuthUrl(projectCode, params.inviteCode)
      return res.json(httpUtil.renderResult(systemCode.OK, { authUrl: url}))
    } catch (err) {
      next(err)
    }
  })

router.post('/jssdkConfig',
  async (req, res, next) => {
    try {
      const projectCode = checkProjectValid(req)
      const params = checkParameter(req, ['url'])

      const object = await weixinService.getJssdkConfig(projectCode, params.url)
      return res.json(httpUtil.renderResult(systemCode.OK, object))
    } catch (err) {
      next(err)
    }
  })

module.exports = router