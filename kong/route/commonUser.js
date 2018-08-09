const express = require('express')
const router = express.Router({mergeParams: true})
const passport = require('passport')

const validateCodeService = require('@serv/validateCodeService')
const userInfoService = require('@serv/userInfoService')
const userRewardRecordService = require('@serv/userRewardRecordService')
const bizUserService = require('@serv/bizUserService')
const userAccountInfoService = require('@serv/userAccountInfoService')
const userAccountConst = require('@const/userAccount')
const userInfoVO = require('@vo/userInfoVO')
const loginUserVO = require('@vo/loginUserVO')
const userAccountInfoVO = require('@vo/userAccountInfoVO')
const downUserInfoVO = require('@vo/downUserInfoVO')
const rewardRelatedUserInfoVO = require('@vo/rewardRelatedUserInfoVO')
const jwtUserVO = require('@vo/jwtUserVO')
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
      // TODO 检查projectCode参数是否合法

      // 参数检查
      const projectCode = req.params.projectCode
      const phoneNumber = req.body.phoneNumber
      const validateCode = req.body.validateCode
      const inviteCode = req.body.inviteCode
      if(!projectCode || !phoneNumber || !validateCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }
      // 验证验证码
      // const pass = await validateCodeService.checkValidateCode(phoneNumber, validateCode)
      // if(!pass){
      //   return res.json(httpUtil.renderResult(systemCode.SYS_FORBIDDEN))
      // }

      // 验证码通过，注册或者新建用户
      const loginUser = await bizUserService.registerOrLogin(projectCode, phoneNumber, inviteCode)

      // 生成token并返回
      loginUser.token = await jwtUtil.sign(jwtUserVO.render(loginUser))
      res.json(httpUtil.renderResult(systemCode.OK, loginUserVO.render(loginUser)))

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
      //TODO 后台是否需要处理？
      // res.clearCookie(jwtUtil.cookieName)
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

      const combinedUser = await bizUserService.getCombinedUserInfo(projectCode, userCode)
      return res.json(httpUtil.renderResult(systemCode.OK, userInfoVO.render(combinedUser)))
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
 * 修改账户信息
 */
router.put('/accountInfo',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const loginUser = req.user
      const projectCode = loginUser.projectCode
      const userCode = loginUser.userCode
      if(projectCode !== req.params.projectCode){
        return res.json(httpUtil.renderResult(systemCode.SYS_FORBIDDEN))
      }
      //  目前支持修改的属性包括：walletAddress
      const walletAddress = req.body.walletAddress
      if(!walletAddress){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      //  更新
      const user = await userAccountInfoService.updateUserAccountInfo(projectCode, userCode, {
        walletAddress: walletAddress
      })
      return res.json(httpUtil.renderResult(systemCode.OK, userAccountInfoVO.render(user)))
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

/**
 * 获取奖励记录
 */
router.get('/rewardRecords',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const loginUser = req.user
      const projectCode = loginUser.projectCode
      const userCode = loginUser.userCode
      const rewardType = req.query.type || userAccountConst.reward.INVITE
      if(projectCode !== req.params.projectCode){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      const rewardRecordList = await userRewardRecordService.getRewardUserRewardRecordWithRelatedUserList(projectCode, userCode, rewardType)
      const recordUserList = rewardRelatedUserInfoVO.render(rewardRecordList)
      return res.json(httpUtil.renderResult(systemCode.OK, recordUserList))
    } catch (err) {
      next(err)
    }
  })

module.exports = router