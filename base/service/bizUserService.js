const userInfoService = require('./userInfoService')
const userInviteInfoService = require('./userInviteInfoService')
const userAccountInfoService = require('./userAccountInfoService')

/**
 * 创建seedUserInfo
 * @param projectCode
 * @param name
 * @param phoneNumber
 * @returns {Promise<*|Promise<props>>}
 */
const createSeedUser = async (projectCode, name, phoneNumber) => {
  // 创建用户基本信息
  const userInfo = await userInfoService.createUserInfo(projectCode, name, phoneNumber, {isSeedUser: true})
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
 * @param others
 * @returns {Promise<*|Promise<props>>}
 */
const createUser = async (projectCode, name, phoneNumber, others) => {
  // 创建用户基本信息
  const userInfo = await userInfoService.createUserInfo(projectCode, name, phoneNumber, others)
  // 创建用户的邀请信息
  await userInviteInfoService.createUserInviteInfo(projectCode, userInfo.userCode)
  // 创建用户的账户信息
  await userAccountInfoService.createUserAccountInfo(projectCode, userInfo.userCode)
  return userInfo
}
/**
 * 将邀请相关的信息添加到originUser上。
 * originUser可以为任意对象，但是其属性中必须要有projectCode和userCode
 * @param originUser
 * @param inviteInfo
 * @returns {Promise<void>}
 */
const addInviteInfo = async (originUser, inviteInfo) => {
  if(!originUser){
    return originUser
  }
  let userInviteInfo = inviteInfo
  if(!userInviteInfo){
    userInviteInfo = await userInviteInfoService.getUserInviteInfoByUserCode(originUser.projectCode, originUser.userCode)
  }
  originUser.inviteCode = userInviteInfo.inviteCode
  return originUser
}

const getCombinedUserInfo = async (projectCode, userCode) => {
  const user = await userInfoService.getUserInfoByUserCode(projectCode, userCode)
  return await addInviteInfo(user)
}

const getUserInfoByInviteCode = async (inviteCode) => {
  // 验证inviteCode，如果验证成功，将会获取到userInviteInfo
  const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
  return userInviteInfo.userInfo
}

module.exports.createSeedUser = createSeedUser
module.exports.addInviteInfo = addInviteInfo
module.exports.createUser = createUser
module.exports.getCombinedUserInfo = getCombinedUserInfo
module.exports.getUserInfoByInviteCode = getUserInfoByInviteCode
