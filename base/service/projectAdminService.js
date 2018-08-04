const projectAdminDao = require('../dao/projectAdminDao')
const cryptoUtil = require('../util/cryptoUtil')

const checkPassword = async (username, password) => {
  const admin = await projectAdminDao.findByUsername(username)
  if(admin.password === await cryptoUtil.getPasswordHash(password)){
    return admin
  }else{
    return null
  }
}
module.exports.checkPassword = checkPassword