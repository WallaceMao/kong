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

const getRewardUserRewardRecordWithRelatedUserList = async (projectCode, relatedUserCode, rewardType) => {
  return userRewardRecordDao.findAllWithRelatedUserByRewardUser(projectCode, relatedUserCode, rewardType)
}

/**
 * 获得注册奖励的总人数
 * @param projectCode
 * @returns {Promise<*|Promise<*>>}
 */
const getRegisterRewardTotal = async projectCode => {
  return userRewardRecordDao.countAllByRewardType(projectCode, 'register')
}

/**
 * 今天获得注册奖励的人数
 * @param projectCode
 * @returns {Promise<*|Promise<*>>}
 */
const getRegisterRewardToday = async projectCode => {
  return userRewardRecordDao.countTodayByRewardType(projectCode, 'register')
}

/**
 * 获取所有奖励的总金额
 * @param projectCode
 * @returns {Promise<*|Promise<*>>}
 */
const getRewardValueSumTotal = async projectCode => {
  return userRewardRecordDao.findTotalSumRewardValue(projectCode)
}

/**
 * 获取今天奖励的总金额
 * @param projectCode
 * @returns {Promise<*|Promise<*>>}
 */
const getRewardValueSumToday = async projectCode => {
  return userRewardRecordDao.findTodaySumRewardValue(projectCode)
}

module.exports.createUserRewardRecord = createUserRewardRecord
module.exports.getRewardUserRewardRecordList = getRewardUserRewardRecordList
module.exports.getRewardUserRewardRecordWithRelatedUserList = getRewardUserRewardRecordWithRelatedUserList
module.exports.getRelatedUserRewardRecordList = getRelatedUserRewardRecordList
module.exports.getRegisterRewardTotal = getRegisterRewardTotal
module.exports.getRegisterRewardToday = getRegisterRewardToday
module.exports.getRewardValueSumTotal = getRewardValueSumTotal
module.exports.getRewardValueSumToday = getRewardValueSumToday