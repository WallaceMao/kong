const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const projectVO = require('@vo/projectVO')
const projectService = require('@serv/projectService')

router.get('/',
  async (req, res, next) => {
  try {
    validator.check([rule1, rule2])
    const projectCode = req.params.projectCode
    if(!projectCode){
      return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
    }
    const project = await projectService.getProjectInfo(projectCode)
    return res.json(httpUtil.renderResult(systemCode.OK, projectVO.render(project)))
  } catch (err) {
    next(err)
  }
})

module.exports = router