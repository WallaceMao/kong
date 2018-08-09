const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const projectVO = require('@vo/projectVO')
const projectService = require('@serv/projectService')

const { checkProjectValid } = require('../validator')

router.get('/',
  async (req, res, next) => {
  try {
    const projectCode = checkProjectValid(req)

    const project = await projectService.getProjectInfo(projectCode)
    return res.json(httpUtil.renderResult(systemCode.OK, projectVO.render(project)))
  } catch (err) {
    next(err)
  }
})

module.exports = router