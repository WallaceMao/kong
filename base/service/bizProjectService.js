const userInfoService = require('./userInfoService')
const userInviteInfoService = require('./userInviteInfoService')
const userRewardRecordService = require('./userRewardRecordService')
const rewardEngine = require('../reward-engine')

const addRewardRuleConfig = async (originObject) => {
  const config = await rewardEngine.getRewardConfig(originObject.projectCode)
  for(let key in config){
    if(config.hasOwnProperty(key)){
      originObject[key] = config[key]
    }
  }
  return originObject
}

const getInviteInfo = async (projectCode, inviteCode) => {
  // 验证inviteCode，如果验证成功，将会获取到userInviteInfo
  const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
  const userInfo = await userInfoService.getUserInfoByUserCode(userInviteInfo.projectCode, userInviteInfo.userCode)
  return addRewardRuleConfig(userInfo)
}

const getSummary = async projectCode => {
  const totalRewardResult = await userRewardRecordService.getRewardValueSumTotal(projectCode)
  const todayRewardResult = await userRewardRecordService.getRewardValueSumToday(projectCode)
  return {
    projectCode: projectCode,
    totalUser: await userInfoService.getCommonUserInfoTotal(projectCode),
    todayUser: await userInfoService.getCommonUserInfoToday(projectCode),
    totalRegisterReward: await userRewardRecordService.getRegisterRewardTotal(projectCode),
    todayRegisterReward: await userRewardRecordService.getRegisterRewardToday(projectCode),
    totalRewardValue: totalRewardResult.rewardValueSum,
    totalRewardValueUnit: totalRewardResult.rewardValueUnit,
    todayRewardValue: todayRewardResult.rewardValueSum,
    todayRewardValueUnit: todayRewardResult.rewardValueUnit
  }
}

module.exports.getInviteInfo = getInviteInfo
module.exports.getSummary = getSummary