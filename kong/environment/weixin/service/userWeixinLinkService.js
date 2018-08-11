const userWeixinLinkDao = require('../dao/userWeixinLinkDao')

const getUserWeixinLink = async (projectCode, userCode, appId) => {
  return userWeixinLinkDao.findByUserCodeAndAppId(projectCode, userCode, appId)
}

const createUserWeixinLink = async (projectCode, userCode, appId, openId) => {
  return userWeixinLinkDao.create({
    projectCode: projectCode,
    userCode: userCode,
    appId: appId,
    openId: openId
  })
}

module.exports.getUserWeixinLink = getUserWeixinLink
module.exports.createUserWeixinLink = createUserWeixinLink