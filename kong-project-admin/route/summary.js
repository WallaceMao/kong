const express = require('express')
const passport = require('passport')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})

const bizProjectService = require('@serv/bizProjectService')
const { checkProjectCode } = require('../validator')

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

/**
 * 获取统计数据
 */
router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const projectCode = checkProjectCode(req)

      const summary = await bizProjectService.getSummary(projectCode)
      return res.json(httpUtil.renderResult(systemCode.OK, summary))
    } catch (err) {
      next(err)
    }
  })

module.exports = router