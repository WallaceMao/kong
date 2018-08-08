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

/**
 * 获取rewardUserCode用户的所有获奖记录
 * @param projectCode
 * @param rewardUserCode
 * @param rewardType
 * @returns {Promise<*|Promise<*>>}
 */
const getRewardUserRewardRecordList = async (projectCode, rewardUserCode, rewardType) => {
  return userRewardRecordDao.findAllByRewardUser(projectCode, rewardUserCode, rewardType)
}

/**
 * 获取relatedUserCode用户带给上级奖励的所有记录
 * @param projectCode
 * @param relatedUserCode
 * @param rewardType
 * @returns {Promise<void>}
 */
const getRelatedUserRewardRecordList = async (projectCode, relatedUserCode, rewardType) => {
  return userRewardRecordDao.findAllByRelatedUser(projectCode, relatedUserCode, rewardType)
}

module.exports.createUserRewardRecord = createUserRewardRecord
module.exports.getRewardUserRewardRecordList = getRewardUserRewardRecordList
module.exports.getRelatedUserRewardRecordList = getRelatedUserRewardRecordList