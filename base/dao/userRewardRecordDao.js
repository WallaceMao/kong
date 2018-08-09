const UserRewardRecord = require('../domain/UserRewardRecord')
const UserInfo = require('../domain/UserInfo')

const create = async props => {
  return UserRewardRecord.create(props)
}

/**
 * 根据rewardUserCode获取RewardRecord，通过左连接连接relatedUser
 * @param projectCode
 * @param rewardUserCode
 * @param rewardType
 * @returns {Promise<*>}
 */
const findAllWithRelatedUserByRewardUser = async (projectCode, rewardUserCode, rewardType) => {
  const whereClause = {
    projectCode: projectCode,
    rewardUserCode: rewardUserCode
  }
  if(rewardType){
    whereClause.rewardType = rewardType
  }
  return UserRewardRecord.findAll({
    where: whereClause,
    include: [{
      required: true,
      model: UserInfo,
      as: 'relatedUser'
    }]
  })
}

const findAllByRewardUser = async (projectCode, rewardUserCode, rewardType) => {
  const whereClause = {
    projectCode: projectCode,
    rewardUserCode: rewardUserCode
  }
  if(rewardType){
    whereClause.rewardType = rewardType
  }
  return UserRewardRecord.findAll({
    where: whereClause
  })
}

const findAllByRelatedUser = async (projectCode, relatedUserCode, rewardType) => {
  const whereClause = {
    projectCode: projectCode,
    relatedUserCode: relatedUserCode
  }
  if(rewardType){
    whereClause.rewardType = rewardType
  }
  return UserRewardRecord.findAll({
    where: whereClause
  })
}

module.exports.create = create
module.exports.findAllByRewardUser = findAllByRewardUser
module.exports.findAllWithRelatedUserByRewardUser = findAllWithRelatedUserByRewardUser
module.exports.findAllByRelatedUser = findAllByRelatedUser