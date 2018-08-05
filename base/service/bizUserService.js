const userInfoService = require('./userInfoService')
const userInviteInfoService = require('./userInviteInfoService')
const userAccountInfoService = require('./userAccountInfoService')
const userRelationService = require('./userRelationService')

/**
 * 创建seedUserInfo
 * @param projectCode
 * @param name
 * @param phoneNumber
 * @returns {Promise<*|Promise<props>>}
 */
const createSeedUser = async (projectCode, name, phoneNumber) => {
  // 创建用户基本信息
  const userInfo = await userInfoService.createUserInfo(projectCode, name, phoneNumber, true)
  // 创建用户的邀请信息
  await userInviteInfoService.createUserInviteInfo(projectCode, userInfo.userCode)
  // 创建用户的账户信息
  await userAccountInfoService.createUserAccountInfo(projectCode, userInfo.userCode)
  return userInfo
}
/**
 * 创建commonUserInfo
 * @param projectCode
 * @param name
 * @param phoneNumber
 * @returns {Promise<*|Promise<props>>}
 */
const createUser = async (projectCode, name, phoneNumber) => {
  // 创建用户基本信息
  const userInfo = await userInfoService.createUserInfo(projectCode, name, phoneNumber)
  // 创建用户的邀请信息
  await userInviteInfoService.createUserInviteInfo(projectCode, userInfo.userCode)
  // 创建用户的账户信息
  await userAccountInfoService.createUserAccountInfo(projectCode, userInfo.userCode)
  return userInfo
}
/**
 * 如果验证码对了，那么就查找系统中是否有这个项目下是否有这个手机号注册的用户。
 * 如果有，那么就登录
 * 如果没有，那么就新建
 * @param projectCode
 * @param phoneNumber
 * @param inviteCode
 * @returns {Promise<void>}
 */
const registerOrLogin = async (projectCode, phoneNumber, inviteCode) => {
  // 验证inviteCode，如果验证成功，将会获取到userInviteInfo
  const userInviteInfo = await userInviteInfoService.validateInviteInfo(projectCode, inviteCode)

  // 根据userInfo是否存在，判断走登录，还是注册流程
  let userInfo = await userInfoService.getUserInfoByPhoneNumber(projectCode, phoneNumber)
  if(!userInfo){
    userInfo = await createUser(projectCode, phoneNumber, phoneNumber)
    await userRelationService.createUserRelation(projectCode, userInviteInfo.userCode, userInfo.userCode)
  }
  return userInfo
}

module.exports.registerOrLogin = registerOrLogin
module.exports.createSeedUser = createSeedUser
module.exports.createUser = createUser