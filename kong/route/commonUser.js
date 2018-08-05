const express = require('express')
const router = express.Router({mergeParams: true})
const passport = require('passport')

const validateCodeService = require('@serv/validateCodeService')
const userInfoService = require('@serv/userInfoService')
const userAccountInfoService = require('@serv/userAccountInfoService')
const userInfoVO = require('@vo/userInfoVO')
const userAccountInfoVO = require('@vo/userAccountInfoVO')
const downUserInfoVO = require('@vo/downUserInfoVO')
const jwtCookieUserVO = require('@vo/jwtCookieUserVO')
const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const jwtUtil = require('@util/jwtUtil')

/**
 * 发送验证码
 */
router.post('/validateCode',
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const phoneNumber = req.body.phoneNumber
      if(!projectCode || !phoneNumber){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }
      await validateCodeService.handleValidateCode(phoneNumber)
      res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })
/**
 * 登录
 */
router.post('/login',
  async (req, res, next) => {
    try {
      // 参数检查
      const projectCode = req.params.projectCode
      const phoneNumber = req.body.phoneNumber
      const validateCode = req.body.validateCode
      const inviteCode = req.body.inviteCode
      if(!projectCode || !phoneNumber || !validateCode || !inviteCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }
      // 验证验证码
      // const pass = await validateCodeService.checkValidateCode(phoneNumber, validateCode)
      // if(!pass){
      //   return res.json(httpUtil.renderResult(systemCode.SYS_FORBIDDEN))
      // }

      // 验证码通过，注册或者新建用户
      const loginUser = await userInfoService.registerOrLogin(projectCode, phoneNumber, inviteCode)

      // 设置cookie，标记登录或者新建成功
      const token = await jwtUtil.sign(jwtCookieUserVO.render(loginUser))
      res.cookie(jwtUtil.cookieName, token, { expires: new Date(Date.now() + jwtUtil.cookieExpiresSeconds) })
      res.json(httpUtil.renderResult(systemCode.OK, userInfoVO.render(loginUser)))

    } catch (err) {
      next(err)
    }
  })

/**
 * 注销登录
 */
router.post('/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      res.clearCookie(jwtUtil.cookieName)
      res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })
/**
 * 获取项目信息
 */
// router.get('/project',
//   // passport.authenticate('jwt', { session: false }),
//   async (req, res, next) => {
//     try {
//       res.json(httpUtil.success())
//     } catch (err) {
//       next(err)
//     }
//   })
/**
 * 获取用户信息
 */
router.get('/userInfo',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const loginUser = req.user
      const projectCode = req.params.projectCode
      const userCode = loginUser.userCode
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
 * 获取账户信息
 */
router.get('/accountInfo',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const loginUser = req.user
      const projectCode = req.params.projectCode
      const userCode = loginUser.userCode
      if(!projectCode || !userCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      const user = await userAccountInfoService.getUserAccountInfo(projectCode, userCode)
      const userVO = userAccountInfoVO.render(user)
      return res.json(httpUtil.renderResult(systemCode.OK, userVO))
    } catch (err) {
      next(err)
    }
  })
/**
 * 获取下线信息
 */
router.get('/downUsers',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const loginUser = req.user
      const projectCode = req.params.projectCode
      const userCode = loginUser.userCode
      if(!projectCode || !userCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      const userList = await userInfoService.getDownUserRelationList(projectCode, userCode)
      const relationList = downUserInfoVO.render(userList)
      return res.json(httpUtil.renderResult(systemCode.OK, relationList))
    } catch (err) {
      next(err)
    }
  })

module.exports = router