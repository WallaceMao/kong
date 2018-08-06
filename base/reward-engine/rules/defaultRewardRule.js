const projectService = require('@serv/projectService')
const userAccountInfoService = require('@serv/userAccountInfoService')
const userInfoService = require('@serv/userInfoService')
const bizUserRewardService = require('@serv/bizUserRewardService')
const userAccountConst = require('@const/userAccount')

const configType = {
  registerRewardValue: 'number', // 注册奖励值
  registerRewardUnit: 'string', // 注册奖励计量单位
  inviteRewardValue: 'number', // 邀请奖励的金额
  inviteRewardUnit: 'string', // 邀请奖励的计量单位
  inviteRewardLimit: 'number' // 邀请的限制
}

const check = (projectCode) => {
  const config = projectService.getRewardConfig(projectCode)
  for(let key in config){
    if(config.hasOwnProperty(key)){
      if(configType[key] !== typeof config[key]){
        throw new Error(`defaultRewardRule config type check error: ${key}, expect type: ${configType[key]}, actual type: ${config[key]}`)
      }
    }
  }
}

/**
 * 注册奖励的策略，给新注册的triggeredUserCode用户增加registerRewardValue指定的金额
 * @param config
 * @param projectCode
 * @param triggeredUserCode
 * @param params
 */
const register = async (config, projectCode, triggeredUserCode, params) => {
  const rewardValue = config.registerRewardValue
  const rewardValueUnit = config.registerRewardUnit
  await bizUserRewardService.rewardUser(
    projectCode,
    userAccountConst.reward.REGISTER,
    triggeredUserCode,
    rewardValue,
    rewardValueUnit)
}

/**
 * 邀请奖励的策略，给triggeredUserCode用户的上级用户增加inviteRewardValue指定的金额
 * @param config
 * @param projectCode
 * @param triggeredUserCode
 * @param params
 */
const invite = async (config, projectCode, triggeredUserCode, params) => {
  // 查找上级用户的userCode
  const userRelation = await userInfoService.getUpUserRelation(projectCode, triggeredUserCode)
  const upUserInfo = userRelation.upUser
  // 查找上级用户是否为seedUser，种子用户没有奖励
  if(upUserInfo.isSeedUser === true){
    return
  }
  // 如果该用户达到了奖励上限，那么也没有奖励
  const inviteRewardLimit = config.inviteRewardLimit
  const upUserAccountInfo = await userAccountInfoService.getUserAccountInfo(projectCode, upUserInfo.userCode)
  if(upUserAccountInfo.invitePackageClaimed >= upUserAccountInfo.invitePackageSum){
    return
  }
  // 奖励
  const inviteRewardValue = config.inviteRewardValue
  const inviteRewardUnit = config.inviteRewardValue
  await bizUserRewardService.rewardUser(
    projectCode,
    userAccountConst.reward.INVITE,
    upUserInfo.userCode,
    inviteRewardValue,
    inviteRewardUnit)
}

module.exports = {
  check: check,
  register: register,
  invite: invite
}