const projectService = require('@serv/projectService')
const userAccountInfoService = require('@serv/userAccountInfoService')
const userInfoService = require('@serv/userInfoService')
const bizUserRewardService = require('@serv/bizUserRewardService')
const userRewardRecordService = require('@serv/userRewardRecordService')
const userAccountConst = require('@const/userAccount')
const rewardConfigUtil = require('../rewardConfigUtil')

/**
 * 默认规则：固定注册奖励、固定邀请奖励、限制邀请奖励数量
 * @type {{registerRewardValue: string, registerRewardUnit: string, inviteRewardValue: string, inviteRewardUnit: string, inviteRewardLimit: string}}
 */
const configType = {
  // 注册奖励值
  registerRewardValue: {
    type: 'number',
    required: true
  },
  // 注册奖励计量单位
  registerRewardUnit: {
    type: 'string',
    required: false
  },
  // 邀请奖励的金额
  inviteRewardValue: {
    type: 'number',
    required: true
  },
  // 邀请奖励的计量单位
  inviteRewardUnit: {
    type: 'string',
    required: false
  },
  // 邀请的限制
  inviteRewardLimit: {
    type: 'number',
    required: true
  }
}
/**
 * 提供check方法，以供应用在启动的时候做检查
 * 由于奖励计算所如此重要，因此建议提供比较严格的check方法，以便在项目启动时，可以检查出参数配置的问题
 * @param projectCode
 * @returns {Promise<void>}
 */
const check = async projectCode => {
  const config = await rewardConfigUtil.getRewardConfig(projectCode)
  for(let key in configType){
    if(configType.hasOwnProperty(key)){
      if(configType[key].required && !config.hasOwnProperty(key)){
        throw new Error(`config item is required but not exists: ${key}`)
      }
      if(configType[key].type === 'number' && Number.isNaN(parseFloat(config[key]))){
        throw new Error(`config item ${key} required type number, but got ${typeof config[key]}`)
      }
    }
  }
}

/**
 * 提供奖励的规则信息
 * @param projectCode
 * @returns {Promise<{registerRewardValue: string, registerRewardUnit: Project.defaultUnit|{type, field, allowNull}, inviteRewardValue: string, inviteRewardUnit: Project.defaultUnit|{type, field, allowNull}, inviteRewardLimit: string|*|UserAccountInfo.inviteRewardLimit|{type, field, allowNull, defaultValue}}>}
 */
const getConfig = async (projectCode) => {
  const config = await rewardConfigUtil.getRewardConfig(projectCode)
  const projectInfo = await projectService.getProjectInfo(projectCode)

  return {
    registerRewardValue: parseFloat(parseFloat(config.registerRewardValue).toFixed(2)),
    registerRewardUnit: config.registerRewardUnit || projectInfo.defaultUnit,
    registerRewardLimit: 1,  // 注册奖励只能奖励一次
    inviteRewardValue: parseFloat(parseFloat(config.inviteRewardValue).toFixed(2)),
    inviteRewardUnit: config.inviteRewardUnit || projectInfo.defaultUnit,
    inviteRewardLimit: parseInt(config.inviteRewardLimit)
  }
}

/**
 * 注册奖励的策略，给新注册的triggeredUserCode用户增加registerRewardValue指定的金额
 * 注册奖励只能奖励一次
 * @param config
 * @param projectCode
 * @param triggeredUserCode
 * @param params
 */
const register = async (projectCode, triggeredUserCode) => {
  const config = await getConfig(projectCode)
  // 注册奖励只能奖励一次，如果已经奖励过，那么就不再奖励
  const recordList = userRewardRecordService.getRewardUserRewardRecordList(projectCode, triggeredUserCode, userAccountConst.reward.REGISTER)
  if(recordList && recordList.length > 0){
    return
  }
  const rewardValue = config.registerRewardValue
  const rewardValueUnit = config.registerRewardUnit
  return bizUserRewardService.rewardUser(
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
const invite = async (projectCode, triggeredUserCode) => {
  const config = await getConfig(projectCode)
  // 如果一个用户，已经奖励过他的上级，那么就不会再次奖励
  const recordList = userRewardRecordService.getRelatedUserRewardRecordList(projectCode, triggeredUserCode, userAccountConst.reward.INVITE)
  if(recordList && recordList.length > 0){
    return
  }
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
  const limit = upUserAccountInfo.inviteRewardLimit !== -1
    ? upUserAccountInfo.inviteRewardLimit
    : inviteRewardLimit
  if(upUserAccountInfo.invitePackageClaimed >= limit){
    return
  }
  // 奖励
  const inviteRewardValue = config.inviteRewardValue
  const inviteRewardValueUnit = config.inviteRewardUnit
  return bizUserRewardService.rewardUser(
    projectCode,
    userAccountConst.reward.INVITE,
    upUserInfo.userCode,
    inviteRewardValue,
    inviteRewardValueUnit,
    triggeredUserCode)
}

module.exports = {
  check: check,
  getConfig: getConfig,
  register: register,
  invite: invite
}