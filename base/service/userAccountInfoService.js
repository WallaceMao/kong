const userAccountInfoDao = require('../dao/userAccountInfoDao')
const userAccountInfoConst = require('../constant/userAccount')
const projectService = require('../service/projectService')
const commonUtil = require('../util/commonUtil')

/**
 * 获取project中的seedUser的列表
 * @param projectCode
 * @param userCode
 * @returns {Promise<*|Promise<*>>}
 */
const getUserAccountInfo = async (projectCode, userCode) => {
  return userAccountInfoDao.findByUserCode(projectCode, userCode)
}

/**
 * 目前允许修改的包括：
 * balanceValue
 * balanceValueUnit
 * invitePackageSum
 * invitePackageClaimed
 * accountStatus
 * @param projectCode
 * @param userCode
 * @param props
 * @returns {Promise<*>}
 */
const updateUserAccountInfo = async (projectCode, userCode, props) => {
  props = props || {}
  const dbUpdate = commonUtil.filterObjectProperties(props, ['balanceValue', 'balanceValueUnit', 'invitePackageSum', 'invitePackageClaimed', 'accountStatus'])

  if(Object.keys(dbUpdate).length === 0){
    return null
  }
  return userAccountInfoDao.updateByUserCode(projectCode, userCode, dbUpdate)
}

const createUserAccountInfo = async (projectCode, userCode) => {
  const rewardConfig = projectService.getRewardConfig(projectCode)
  return userAccountInfoDao.create({
    projectCode: projectCode,
    userCode: userCode,
    balanceValue: 0,
    balanceValueUnit: rewardConfig.registerRewardUnit,
    invitePackageSum: rewardConfig.inviteRewardLimit,
    invitePackageClaimed: 0,
    accountStatus: userAccountInfoConst.status.OPEN
  })
}

module.exports.getUserAccountInfo = getUserAccountInfo
module.exports.createUserAccountInfo = createUserAccountInfo
module.exports.updateUserAccountInfo = updateUserAccountInfo