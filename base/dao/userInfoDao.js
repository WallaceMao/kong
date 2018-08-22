const Sequelize = require('sequelize')
const Op = Sequelize.Op
const moment = require('moment')
const UserInfo = require('../domain/UserInfo')

/**
 * 根据id查找用户
 * @param id
 * @returns {*}
 */
const findById = async id =>{
  return UserInfo.findById(id)
}

/**
 * 创建
 * @param props
 * @returns {Promise<props>}
 */
const create = async props => {
  return UserInfo.create(props)
}
/**
 * 根据userCode更新
 * @param projectCode
 * @param userCode
 * @param props
 * @returns {Promise<void>}
 */
const updateByUserCode = async (projectCode, userCode, props) =>{
  let obj = await findByUserCode(projectCode, userCode)
  if(obj){
    return obj.update(props)
  }
}
/**
 * 根据userCode删除
 * @param projectCode
 * @param userCode
 * @param force。强制删除还是假删除，默认为假删除
 * @returns {Promise<void>}
 */
const deleteByUserCode = async (projectCode, userCode, force) =>{
  let obj = await findByUserCode(projectCode, userCode)
  if(obj){
    return obj.destroy({
      force: !!force
    })
  }
}

/**
 *
 * @param projectCode
 * @param userCode
 * @returns {Promise<*>}
 */
const findByUserCode = async (projectCode, userCode) => {
  return UserInfo.findOne({
    where: {
      projectCode: projectCode,
      userCode: userCode
    }
  })
}
/**
 * 根据是否为seedUser查找用户
 * @param projectCode
 * @param isSeedUser
 * @returns {Promise<void>}
 */
const findAllByIsSeedUser = async (projectCode, isSeedUser) => {
  return UserInfo.findAll({
    where: {
      projectCode: projectCode,
      isSeedUser: !!isSeedUser
    }
  })
}
/**
 * 根据手机号查询
 * @param projectCode
 * @param phoneNumber
 * @returns {Promise<*>}
 */
const findByPhoneNumber = async (projectCode, phoneNumber) => {
  return UserInfo.findOne({
    where: {
      projectCode: projectCode,
      phoneNumber: phoneNumber
    }
  })
}

const countAllByIsSeedUser = async (projectCode, isSeedUser) => {
  return UserInfo.count({
    where: {
      projectCode: projectCode,
      isSeedUser: !!isSeedUser
    }
  })
}

const countTodayByIsSeedUser = async (projectCode, isSeedUser) => {
  return UserInfo.count({
    where: {
      projectCode: projectCode,
      isSeedUser: !!isSeedUser,
      createdAt: {
        [Op.gte]: moment().startOf('day')
      }
    }
  })
}

module.exports.findById = findById
module.exports.create = create
module.exports.updateByUserCode = updateByUserCode
module.exports.deleteByUserCode = deleteByUserCode
module.exports.findByUserCode = findByUserCode
module.exports.findAllByIsSeedUser = findAllByIsSeedUser
module.exports.findByPhoneNumber = findByPhoneNumber
module.exports.countAllByIsSeedUser = countAllByIsSeedUser
module.exports.countTodayByIsSeedUser = countTodayByIsSeedUser