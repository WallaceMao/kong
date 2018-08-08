const UserRewardRecord = require('../domain/UserRewardRecord')

const create = async props => {
  return UserRewardRecord.create(props)
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
module.exports.findAllByRelatedUser = findAllByRelatedUser