const express = require('express')
const passport = require('passport')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const userInfoService = require('@serv/userInfoService')
const bizUserService = require('@serv/bizUserService')
const userInfoVO = require('@vo/userInfoVO')

const { checkProjectCode, checkParameter } = require('../validator')

/**
 * 获取指定项目的系统用户的成员列表
 */
router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const projectCode = checkProjectCode(req)

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
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const projectCode = checkProjectCode(req)
      const params = checkParameter(req, 'userCode')
      const userCode = params.userCode

      const user = await userInfoService.getUserInfoByUserCode(projectCode, userCode)
      const userVO = userInfoVO.render(user)
      return res.json(httpUtil.renderResult(systemCode.OK, userVO))
    } catch (err) {
      next(err)
    }
  })

/**
 * 创建种子用户
 */
router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const projectCode = checkProjectCode(req)
      const params = checkParameter(req, 'name', 'phoneNumber')
      const name = params.name
      const phoneNumber= params.phoneNumber

      await bizUserService.createSeedUser(projectCode, name, phoneNumber)
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

/**
 * 更改获取指定项目的系统用户的成员
 */
router.put('/:userCode',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const projectCode = checkProjectCode(req)
      const params = checkParameter(req, 'userCode')
      const userCode = params.userCode

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
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const projectCode = checkProjectCode(req)
      const params = checkParameter(req, 'userCode')
      const userCode = params.userCode

      await userInfoService.removeUserInfo(projectCode, userCode)
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

module.exports = router