const userInfoDao = require('../dao/userInfoDao')
const userInfoConst = require('../constant/userInfo')
const randomUtil = require('../util/randomUtil')

/**
 * 获取project中的seedUser的列表
 * @param projectCode
 * @returns {Promise<*>}
 */
const getProjectSeedUserInfoList = async projectCode => {
  return await userInfoDao.findAllByIsSeedUser(projectCode, true)
}
/**
 * 根据projectCode和userCode获取用户
 * @param projectCode
 * @param userCode
 * @returns {Promise<*|{id, projectCode, userCode, name, phoneNumber, avatar, isSeedUser, status}>}
 */
const getUserInfoByUserCode = async (projectCode, userCode) => {
  return await userInfoDao.findByUserCode(projectCode, userCode)
}

/**
 * 创建seedUserInfo
 * @param projectCode
 * @param name
 * @param phoneNumber
 * @returns {Promise<*|Promise<props>>}
 */
const createSeedUserInfo = async (projectCode, name, phoneNumber) => {
  const userCode = await randomUtil.generateIdentifier()
  return userInfoDao.create({
    projectCode: projectCode,
    userCode: userCode,
    name: name,
    phoneNumber: phoneNumber,
    isSeedUser: true,
    status: userInfoConst.status.OPEN
  })
}
/**
 * 创建普通的UserInfo
 * @param projectCode
 * @param name
 * @param phoneNumber
 * @returns {Promise<*|Promise<props>>}
 */
const createCommonUserInfo = async (projectCode, name, phoneNumber) => {
  return userInfoDao.create({
    projectCode: projectCode,
    userCode: randomUtil.generateIdentifier(),
    name: name,
    phoneNumber: phoneNumber,
    isSeedUser: false,
    status: userInfoConst.status.OPEN
  })
}
/**
 * 更新userInfo，目前只更新name和avatar
 * @param projectCode
 * @param userCode
 * @param props
 * @returns {Promise<void>}
 */
const updateUserInfo = async (projectCode, userCode, props) => {
  props = props || {}
  const dbUpdate = {}
  if(props.name){
    dbUpdate.name = props.name
  }
  if(props.avatar){
    dbUpdate.avatar = props.avatar
  }

  if(Object.keys(dbUpdate).length === 0){
    return null
  }
  return userInfoDao.updateByUserCode(projectCode, userCode, dbUpdate)
}
/**
 * 删除UserInfo
 * @param projectCode
 * @param userCode
 * @returns {Promise<*|Promise<void>>}
 */
const removeUserInfo = async (projectCode, userCode) => {
  return userInfoDao.deleteByUserCode(projectCode, userCode)
}


module.exports.getProjectSeedUserInfoList = getProjectSeedUserInfoList
module.exports.getUserInfoByUserCode = getUserInfoByUserCode
module.exports.createSeedUserInfo = createSeedUserInfo
module.exports.createCommonUserInfo = createCommonUserInfo
module.exports.updateUserInfo = updateUserInfo
module.exports.removeUserInfo = removeUserInfo
