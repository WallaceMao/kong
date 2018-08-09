const projectAdminDao = require('../dao/projectAdminDao')
const cryptoUtil = require('../util/cryptoUtil')
const { makeError } = require('../util/errorUtil')
const systemCode = require('../constant/systemCode')

const checkPassword = async (username, password) => {
  const admin = await projectAdminDao.findByUsername(username)
  if(admin.password !== await cryptoUtil.getPasswordHash(password)){
    throw makeError(systemCode.SYS_FORBIDDEN)
  }
  return admin
}

const changePassword = async (username, oldPassword, newPassword) => {
  const admin = await checkPassword(username, oldPassword)
  return projectAdminDao.updateByUsername(admin.username, {
    password: await cryptoUtil.getPasswordHash(newPassword)
  })
}
module.exports.checkPassword = checkPassword
module.exports.changePassword = changePassword