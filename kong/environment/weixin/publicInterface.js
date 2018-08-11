const weixinUserService = require('./service/weixinUserService')
const weixinService = require('./service/weixinService')

const getUserInfo = async (openId) => {
  const weixinUser = await weixinUserService.getWeixinUserByOpenId(openId)
  return {
    name: weixinUser.nickname,
    avatar: weixinUser.headImgUrl
  }
}

const getUserLink = async (projectCode, userCode) => {
  const link = await weixinService.getWeixinUserLink(projectCode, userCode)
  return {
    projectCode: link.projectCode,
    userCode: link.userCode,
    appId: link.appId,
    openId: link.openId
  }
}

const createUserLink = async(projectCode, userCode, openId) => {
  const link = await weixinService.createWeixinUserLink(projectCode, userCode, openId)
  return {
    projectCode: link.projectCode,
    userCode: link.userCode,
    appId: link.appId,
    openId: link.openId
  }
}

module.exports.getUserInfo = getUserInfo
module.exports.getUserLink = getUserLink
module.exports.createUserLink = createUserLink