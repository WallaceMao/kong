const projectService = require('@serv/projectService')
const userInfoService = require('@serv/userInfoService')
const userInviteInfoService = require('@serv/userInviteInfoService')
const userRelationService = require('@serv/userRelationService')
const bizUserService = require('@serv/bizUserService')
const { makeError } = require('@util/errorUtil')
const bizUtil = require('@util/bizUtil')

const envManager = require('../environment/manager')

/**
 * 如果验证码对了，那么就查找系统中是否有这个项目下是否有这个手机号注册的用户。
 * 如果有，那么就登录
 * 如果没有，那么就新建
 * @param projectCode
 * @param phoneNumber
 * @param inviteCode
 * @param others
 * @returns {Promise<void>}
 */
const registerOrLogin = async (projectCode, phoneNumber, inviteCode, others) => {
  others = others || {}
  // 根据userInfo是否存在，判断走登录，还是注册流程
  let userInfo = await userInfoService.getUserInfoByPhoneNumber(projectCode, phoneNumber)
  let hasThirdParty = others.thirdParty && others.openId

  if(userInfo && hasThirdParty){
    // 带第三方信息的登录
    return loginWithThirdParty(userInfo, others)
  }else if(userInfo && !hasThirdParty){
    // 普通登录
    return loginCommon(userInfo, others)
  }else if(!userInfo && hasThirdParty){
    // 带第三方信息的注册
    return registerWithThirdParty(projectCode, phoneNumber, inviteCode, others)
  }else if(!userInfo && !hasThirdParty){
    // 普通注册
    return registerCommon(projectCode, phoneNumber, inviteCode, others)
  }else{
    makeError()
  }
}
const registerCheck = async (projectCode, inviteCode) => {
  // 验证inviteCode，如果验证成功，将会获取到userInviteInfo
  const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
  const project = await projectService.getProjectInfo(projectCode)
  if(!project){
    throw makeError()
  }
  return userInviteInfo
}
/**
 * 普通注册
 * @param projectCode
 * @param phoneNumber
 * @param inviteCode
 * @param others
 * @returns {Promise<*>}
 */
const registerCommon = async (projectCode, phoneNumber, inviteCode, others) => {
  const userInviteInfo = await registerCheck(projectCode, inviteCode)

  const userInfo = await bizUserService.createUser(
    projectCode,
    bizUtil.generateName({ phoneNumber }),
    phoneNumber,
    others)
  await userRelationService.createUserRelation(projectCode, userInviteInfo.userCode, userInfo.userCode)
  // 添加loginType，标识是register还是login
  userInfo.loginType = 'register'
  // 直接将inviteCode添加到返回值上
  return await bizUserService.addInviteInfo(userInfo, userInviteInfo)
}
/**
 * 带第三方信息的注册
 * @param projectCode
 * @param phoneNumber
 * @param inviteCode
 * @param others
 * @returns {Promise<void>}
 */
const registerWithThirdParty = async (projectCode, phoneNumber, inviteCode, others) => {
  const userInviteInfo = await registerCheck(projectCode, inviteCode)
  const service = await envManager.getService(others.thirdParty)
  const thirdPartyUserInfo = await service.getUserInfo(others.openId)
  if(!thirdPartyUserInfo || !thirdPartyUserInfo.name){
    // 如果查询不到第三方信息，那么直接走普通注册
    return registerCommon(projectCode, phoneNumber, inviteCode)
  }

  const userInfo = await bizUserService.createUser(
    projectCode,
    thirdPartyUserInfo.name,
    phoneNumber,
    { avatar: thirdPartyUserInfo.avatar, infoFrom: others.thirdParty, ip: others.ip })
  await userRelationService.createUserRelation(projectCode, userInviteInfo.userCode, userInfo.userCode)

  // 绑定第三方
  await service.createUserLink(projectCode, userInfo.userCode, others.openId)
  // 添加loginType，标识是register还是login
  userInfo.loginType = 'register'
  // 直接将inviteCode添加到返回值上
  return await bizUserService.addInviteInfo(userInfo, userInviteInfo)
}
/**
 * 普通登录
 * @param userInfo
 * @returns {Promise<void>}
 */
const loginCommon = async (userInfo) => {
  // 添加loginType，标识是register还是login
  userInfo.loginType = 'login'
  // 直接将inviteCode添加到返回值上
  return bizUserService.addInviteInfo(userInfo)
}
/**
 * 带第三方信息的登录
 * @param userInfo
 * @param others
 * @returns {Promise<void>}
 */
const loginWithThirdParty = async (userInfo, others) => {
  const projectCode = userInfo.projectCode
  const userCode = userInfo.userCode
  const service = await envManager.getService(others.thirdParty)

  // 检查是否是默认信息
  const hasDefaultUserInfo = !userInfo.infoFrom
  if(hasDefaultUserInfo){
    const thirdPartyUserInfo = await service.getUserInfo(others.openId)
    if(!thirdPartyUserInfo || !thirdPartyUserInfo.name){
      // 如果查询不到第三方信息，那么直接走普通登录
      return loginCommon(userInfo)
    }
    // 使用第三方用户的信息更新平台用户
    userInfo = await userInfoService.updateUserInfo(projectCode, userCode, {
      name: thirdPartyUserInfo.name,
      avatar: thirdPartyUserInfo.avatar,
      infoFrom: others.thirdParty
    })
  }
  // 检查是否绑定过第三方
  const thirdPartyLinkArray = await service.getUserLinkList(projectCode, userCode)
  if(!thirdPartyLinkArray || thirdPartyLinkArray.length === 0){
    await service.createUserLink(projectCode, userCode, others.openId)
  }
  // 添加loginType，标识是register还是login
  userInfo.loginType = 'login'
  // 直接将inviteCode添加到返回值上
  return bizUserService.addInviteInfo(userInfo)
}

module.exports.registerOrLogin = registerOrLogin