const express = require('express')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})
const { ensureLoggedIn } = require('connect-ensure-login')

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const userInfoService = require('@serv/userInfoService')
const userInfoVO = require('@vo/userInfoVO')

/**
 * 获取指定项目的系统用户的成员列表
 */
router.get('/',
  // ensureLoggedIn('/401'),
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      if(!projectCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }
      const userList = await userInfoService.getProjectSeedUserInfoList(projectCode)
      const voList = userInfoVO.render(userList)
      return res.json(httpUtil.renderResult(systemCode.OK, voList))
    } catch (err) {
      next(err)
    }
  })

/**
 * 获取指定项目的指定id的系统用户的成员列表
 */
router.get('/:userCode',
  // ensureLoggedIn('/401'),
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const userCode = req.params.userCode
      if(!projectCode || !userCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }
      const user = await userInfoService.getUserInfoByUserCode(projectCode, userCode)
      const userVO = userInfoVO.render(user)
      return res.json(httpUtil.renderResult(systemCode.OK, userVO))
    } catch (err) {
      next(err)
    }
  })

/**
 * 获取指定项目的系统用户
 */
router.post('/',
  // ensureLoggedIn('/401'),
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const name = req.body.name
      const phoneNumber= req.body.phoneNumber
      if(!projectCode || !name || !phoneNumber){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      await userInfoService.createSeedUserInfo(projectCode, name, phoneNumber)
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

/**
 * 更改获取指定项目的系统用户的成员
 */
router.put('/:userCode',
  // ensureLoggedIn('/401'),
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const userCode = req.params.userCode
      if(!projectCode || !userCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      await userInfoService.updateUserInfo(projectCode, userCode, req.body)
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

/**
 * 删除获取指定项目的系统用户的成员
 */
router.delete('/:userCode',
  // ensureLoggedIn('/401'),
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const userCode = req.params.userCode
      if(!projectCode || !userCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      await userInfoService.removeUserInfo(projectCode, userCode)
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

module.exports = router