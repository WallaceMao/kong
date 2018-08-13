const userWeixinLinkDao = require('../dao/userWeixinLinkDao')

const listUserWeixinLinksByUserCode = async (projectCode, userCode, appId) => {
  return userWeixinLinkDao.findAllByUserCodeAndAppId(projectCode, userCode, appId)
}

const listUserWeixinLinksByOpenId = async (openId) => {
  return userWeixinLinkDao.findAllByOpenId(openId)
}

const createUserWeixinLink = async (projectCode, userCode, appId, openId) => {
  return userWeixinLinkDao.create({
    projectCode: projectCode,
    userCode: userCode,
    appId: appId,
    openId: openId
  })
}

module.exports.listUserWeixinLinksByUserCode = listUserWeixinLinksByUserCode
module.exports.listUserWeixinLinksByOpenId = listUserWeixinLinksByOpenId
module.exports.createUserWeixinLink = createUserWeixinLink