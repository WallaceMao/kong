const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const publicInviteVO = require('@vo/publicInviteVO')
const bizProjectService = require('@serv/bizProjectService')

router.get('/:inviteCode',
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const inviteCode = req.params.inviteCode
      if(!projectCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }
      //  获取邀请信息
      const projectInvite = await bizProjectService.getInviteInfo(projectCode, inviteCode)
      return res.json(httpUtil.renderResult(systemCode.OK, publicInviteVO.render(projectInvite)))
    } catch (err) {
      next(err)
    }
  })

module.exports = router