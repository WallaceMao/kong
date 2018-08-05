const userAccountInfoDao = require('../dao/userAccountInfoDao')
const userAccountInfoConst = require('../constant/userAccount')

/**
 * 获取project中的seedUser的列表
 * @param projectCode
 * @param userCode
 * @returns {Promise<*|Promise<*>>}
 */
const getUserAccountInfo = async (projectCode, userCode) => {
  return userAccountInfoDao.findByUserCode(projectCode, userCode)
}

const createUserAccountInfo = async (projectCode, userCode) => {
  return userAccountInfoDao.create({
    projectCode: projectCode,
    userCode: userCode,
    balanceValue: 0,
    balanceValueUnit: 0,
    invitePackageSum: 0,
    invitePackageClaimed: 0,
    accountStatus: userAccountInfoConst.status.OPEN
  })
}

module.exports.getUserAccountInfo = getUserAccountInfo
module.exports.createUserAccountInfo = createUserAccountInfo