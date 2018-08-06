const userRewardRecordDao = require('../dao/userRewardRecordDao')
const constant = require('../constant/constant')

const createUserRewardRecord = async (projectCode, rewardType, rewardUserCode, rewardValue, rewardValueUnit, relatedUserCode) =>{
  return userRewardRecordDao.create({
    projectCode: projectCode,
    rewardType: rewardType,
    rewardUserCode: rewardUserCode,
    rewardValue: rewardValue,
    rewardValueUnit: rewardValueUnit || constant.DEFAULT_UNIT,
    relatedUserCode: relatedUserCode || rewardUserCode
  })
}

module.exports.createUserRewardRecord = createUserRewardRecord