const userAccountInfoService = require('./userAccountInfoService')
const userRewardRecordService = require('./userRewardRecordService')
const systemCode = require('../constant/systemCode')
const errorUtil = require('../util/errorUtil')

const rewardUser = async (projectCode, rewardType, rewardUserCode, rewardValue, rewardValueUnit, relatedUserCode) => {
  // 先插入奖励的记录
  await userRewardRecordService.createUserRewardRecord(
    projectCode, rewardType, rewardUserCode, rewardValue, rewardValueUnit, relatedUserCode)
  // 然后在account中累加
  const userAccountInfo = await userAccountInfoService.getUserAccountInfo(projectCode, rewardUserCode)
  // 如果单位不统一，暂时抛出异常
  if(userAccountInfo.balanceValueUnit !== rewardValueUnit){
    throw errorUtil.makeError(
      systemCode.BIZ_UNIT_NOT_COMPATIBLE,
      `first unit: ${userAccountInfo.balanceValueUnit}, second unit: ${rewardValueUnit}`)
  }
  return userAccountInfoService.updateUserAccountInfo(projectCode, rewardUserCode, {
    balanceValue: (parseFloat(userAccountInfo.balanceValue) + parseFloat(rewardValue)).toFixed(2),
    invitePackageClaimed: (parseInt(userAccountInfo.invitePackageClaimed) + 1)
  })
}

module.exports.rewardUser = rewardUser