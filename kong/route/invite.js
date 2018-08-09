const express = require('express')
const router = express.Router({mergeParams: true})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const publicInviteVO = require('@vo/publicInviteVO')
const bizProjectService = require('@serv/bizProjectService')

const { checkProjectValid } = require('../validator')

router.get('/:inviteCode',
  async (req, res, next) => {
    try {
      const projectCode = checkProjectValid(req)
      const inviteCode = req.params.inviteCode

      //  获取邀请信息
      const projectInvite = await bizProjectService.getInviteInfo(projectCode, inviteCode)
      return res.json(httpUtil.renderResult(systemCode.OK, publicInviteVO.render(projectInvite)))
    } catch (err) {
      next(err)
    }
  })

module.exports = router