const userLoginHistoryDao = require('../dao/userLoginHistoryDao')

const saveHistory = async (projectCode, userCode, loginType, loginIp, userAgent, thirdParty) => {
  const params = {
    projectCode: projectCode,
    userCode: userCode,
    loginType: loginType,
    loginIp: loginIp
  }
  if(userAgent){
    params.userAgent = userAgent.substr(0, 255)
  }
  if(thirdParty){
    params.thirdParty = thirdParty
  }

  return userLoginHistoryDao.create(params)
}

module.exports.saveHistory = saveHistory