const userInfoDao = require('../dao/userInfoDao')
const userRelationDao = require('../dao/userRelationDao')
const userInfoConst = require('../constant/userInfo')
const randomUtil = require('../util/randomUtil')
const commonUtil = require('../util/commonUtil')

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
 * 根据invteCode获取用户信息
 * @param inviteCode
 * @returns {Promise<void>}
 */
const getUserInfoByInviteCode = async (inviteCode) => {
  return userInfoDao.findByInviteCode(inviteCode)
}
/**
 * 根据projectCode和phoneNumber获取用户
 * @param projectCode
 * @param phoneNumber
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
 * @param others
 * @returns {Promise<*|Promise<props>>}
 */
const createUserInfo = async (projectCode, name, phoneNumber, others) => {
  const userCode = await randomUtil.generateIdentifier(others.isSeedUser)
  const params = {
    projectCode: projectCode,
    userCode: userCode,
    name: name,
    phoneNumber: phoneNumber,
    isSeedUser: !!others.isSeedUser,
    status: userInfoConst.status.OPEN
  }
  if(others.avatar){
    params.avatar = others.avatar
  }
  if(others.infoFrom){
    params.infoFrom = others.infoFrom
  }
  if(others.ip){
    params.registerIp = others.ip
  }
  // 创建用户基本信息
  return userInfoDao.create(params)
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
  const dbUpdate = commonUtil.filterObjectProperties(props, ['name', 'avatar', 'infoFrom'])

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

/**
 * 获取上级用户的关系
 * @param projectCode
 * @param downUserCode
 * @returns {Promise<*|Promise<*>>}
 */
const getUpUserRelation = async (projectCode, downUserCode) => {
  return userRelationDao.findByDownUserCode(projectCode, downUserCode)
}

const getCommonUserInfoTotal = async projectCode => {
  return userInfoDao.countAllByIsSeedUser(projectCode)
}
const getCommonUserInfoToday = async projectCode => {
  return userInfoDao.countTodayByIsSeedUser(projectCode)
}

module.exports.getProjectSeedUserInfoList = getProjectSeedUserInfoList
module.exports.getUserInfoByUserCode = getUserInfoByUserCode
module.exports.getUserInfoByInviteCode = getUserInfoByInviteCode
module.exports.getUserInfoByPhoneNumber = getUserInfoByPhoneNumber
module.exports.getDownUserRelationList = getDownUserRelationList
module.exports.getUpUserRelation = getUpUserRelation
module.exports.createUserInfo = createUserInfo
module.exports.updateUserInfo = updateUserInfo
module.exports.removeUserInfo = removeUserInfo
module.exports.getCommonUserInfoTotal = getCommonUserInfoTotal
module.exports.getCommonUserInfoToday = getCommonUserInfoToday
