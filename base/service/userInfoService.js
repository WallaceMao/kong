const userInfoDao = require('../dao/userInfoDao')
const userRelationDao = require('../dao/userRelationDao')
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
  return userInfoDao.findByUserCode(projectCode, userCode)
}
/**
 * 根据projectCode和phoneNumber获取用户
 * @param projectCode
 * @param userCode
 * @returns {Promise<*|{id, projectCode, userCode, name, phoneNumber, avatar, isSeedUser, status}>}
 */
const getUserInfoByPhoneNumber = async (projectCode, phoneNumber) => {
  return userInfoDao.findByPhoneNumber(projectCode, phoneNumber)
}

/**
 * 创建seedUserInfo
 * @param projectCode
 * @param name
 * @param phoneNumber
 * @param isSeedUser
 * @returns {Promise<*|Promise<props>>}
 */
const createUserInfo = async (projectCode, name, phoneNumber, isSeedUser) => {
  const userCode = await randomUtil.generateIdentifier()
  // 创建用户基本信息
  return userInfoDao.create({
    projectCode: projectCode,
    userCode: userCode,
    name: name,
    phoneNumber: phoneNumber,
    isSeedUser: !!isSeedUser,
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
/**
 * 获取userCode的用户的下线用户列表
 * @param projectCode
 * @param userCode
 * @returns {Promise<void>}
 */
const getDownUserRelationList = async (projectCode, userCode) => {
  return userRelationDao.findAllByUpUserCode(projectCode, userCode)
}

module.exports.getProjectSeedUserInfoList = getProjectSeedUserInfoList
module.exports.getUserInfoByUserCode = getUserInfoByUserCode
module.exports.getUserInfoByPhoneNumber = getUserInfoByPhoneNumber
module.exports.getDownUserRelationList = getDownUserRelationList
module.exports.createUserInfo = createUserInfo
module.exports.updateUserInfo = updateUserInfo
module.exports.removeUserInfo = removeUserInfo
