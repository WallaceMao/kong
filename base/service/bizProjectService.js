const userInfoService = require('./userInfoService')
const userInviteInfoService = require('./userInviteInfoService')
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

module.exports.getInviteInfo = getInviteInfo