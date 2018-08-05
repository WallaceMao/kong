const UserInviteInfo = require('../domain/UserInviteInfo')

/**
 * 根据id查找用户
 * @param id
 * @returns {*}
 */
const findById = async id =>{
  return UserInviteInfo.findById(id)
}

/**
 * 创建
 * @param props
 * @returns {Promise<props>}
 */
const create = async props => {
  return UserInviteInfo.create(props)
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
    obj.destroy({
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
  return UserInviteInfo.findOne({
    where: {
      projectCode: projectCode,
      userCode: userCode
    }
  })
}

const findByInviteCode = async (projectCode, inviteCode) => {
  return UserInviteInfo.findOne({
    where: {
      projectCode: projectCode,
      inviteCode: inviteCode
    }
  })
}

module.exports.findById = findById
module.exports.create = create
module.exports.updateByUserCode = updateByUserCode
module.exports.deleteByUserCode = deleteByUserCode
module.exports.findByUserCode = findByUserCode
module.exports.findByInviteCode = findByInviteCode
