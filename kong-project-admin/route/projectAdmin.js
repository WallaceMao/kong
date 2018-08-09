const express = require('express')
const passport = require('passport')
const router = express.Router({
  mergeParams: true  // 指定mergeParams参数，将父路由中的req.params参数合并到本路由中
})
const userService = require('@serv/projectAdminService')
const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')
const errorUtil = require('@util/errorUtil')
const jwtUtil = require('@util/jwtUtil')

const { checkParameter } = require('../validator')

/**
 * 项目管理员登陆
 */
router.post('/login',
  async (req, res, next) => {
    try {
      const projectCode = req.params.projectCode
      const username = req.body.username
      const password = req.body.password
      if(!projectCode || !username || !password){
        return res.json(httpUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
      }

      const admin = await userService.checkPassword(username, password)
      if(!admin){
        return errorUtil.makeError(systemCode.SYS_FORBIDDEN)
      }
      // 生成token并返回
      const result = {projectCode: admin.projectCode, username: admin.username}
      result.token = await jwtUtil.sign(result)
      return res.json(httpUtil.renderResult(systemCode.OK, result))
    } catch (err) {
      next(err)
    }
  })

/**
 * 项目管理员登出
 */
router.post('/logout',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      //  可以不做处理
      return res.json(httpUtil.success())
    } catch (err) {
      next(err)
    }
  })

/**
 * 修改密码
 */
router.put('/password',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const username = req.user.username
      const params = checkParameter(req, ['oldPassword', 'newPassword'])

      const admin = await userService.changePassword(username, params.oldPassword, params.newPassword)
      // 生成token并返回
      const result = {projectCode: admin.projectCode, username: admin.username}
      result.token = await jwtUtil.sign(result)
      return res.json(httpUtil.renderResult(systemCode.OK, result))
    } catch (err) {
      next(err)
    }
  })

module.exports = router