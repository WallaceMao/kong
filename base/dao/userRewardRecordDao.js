const sequelize = require('sequelize')
const Op = sequelize.Op
const UserRewardRecord = require('../domain/UserRewardRecord')
const UserInfo = require('../domain/UserInfo')
const Project = require('../domain/Project')
const moment = require('moment')

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

const countAllByRewardType = async (projectCode, rewardType) => {
  return UserRewardRecord.count({
    where: {
      projectCode: projectCode,
      rewardType: rewardType
    }
  })
}
const countTodayByRewardType = async (projectCode, rewardType) => {
  return UserRewardRecord.count({
    where: {
      projectCode: projectCode,
      rewardType: rewardType,
      createdAt: {
        [Op.gte]: moment().startOf('day')
      }
    }
  })
}

const findTotalSumRewardValue = async projectCode => {
  let result = await UserRewardRecord.findOne({
    attributes: [
      'projectCode',
      [sequelize.fn('sum', sequelize.col('reward_value')), 'rewardValueSum'],
      'rewardValueUnit'
    ],
    where: {
      projectCode: projectCode
    },
    group: ['projectCode']
  })
  //  如果result为null
  let sum, unit
  if(result){
    sum = parseFloat(result.get({ plain: true }).rewardValueSum)
    unit = result.rewardValueUnit
  }else{
    const single = await Project.findOne({
      where: {
        projectCode: projectCode
      }
    })
    sum = 0
    unit = single.defaultUnit
  }
  return {
    projectCode: projectCode,
    rewardValueSum: sum,
    rewardValueUnit: unit
  }
}
const findTodaySumRewardValue = async projectCode => {
  let result = await UserRewardRecord.findOne({
    attributes: [
      'projectCode',
      [sequelize.fn('sum', sequelize.col('reward_value')), 'rewardValueSum'],
      'rewardValueUnit'
    ],
    where: {
      projectCode: projectCode,
      createdAt: {
        [Op.gte]: moment().startOf('day')
      }
    },
    group: ['projectCode']
  })
  //  如果result为null
  let sum, unit
  if(result){
    sum = parseFloat(result.get({ plain: true }).rewardValueSum)
    unit = result.rewardValueUnit
  }else{
    const single = await Project.findOne({
      where: {
        projectCode: projectCode
      }
    })
    sum = 0
    unit = single.defaultUnit
  }
  return {
    projectCode: projectCode,
    rewardValueSum: sum,
    rewardValueUnit: unit
  }
}


module.exports.create = create
module.exports.findAllByRewardUser = findAllByRewardUser
module.exports.findAllWithRelatedUserByRewardUser = findAllWithRelatedUserByRewardUser
module.exports.findAllByRelatedUser = findAllByRelatedUser
module.exports.countAllByRewardType = countAllByRewardType
module.exports.countTodayByRewardType = countTodayByRewardType
module.exports.findTotalSumRewardValue = findTotalSumRewardValue
module.exports.findTodaySumRewardValue = findTodaySumRewardValue