const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

const bizWeixinService = require('../service/bizWeixinService')
const { checkProjectValid } = require('../../validator')

router.get('/authUrl',
  async (req, res, next) => {
    try {
      const projectCode = checkProjectValid(req)

      const url = await bizWeixinService.getAuthUrl(projectCode)
      return res.json(httpUtil.renderResult(systemCode.OK, { authUrl: url}))
    } catch (err) {
      next(err)
    }
  })

module.exports = router