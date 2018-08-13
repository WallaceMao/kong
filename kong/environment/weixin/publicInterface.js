const weixinUserService = require('./service/weixinUserService')
const weixinService = require('./service/weixinService')

const getUserInfo = async (openId) => {
  const weixinUser = await weixinUserService.getWeixinUserByOpenId(openId)
  let result = null
  if(weixinUser){
    result = {
      name: weixinUser.nickname,
      avatar: weixinUser.headImgUrl
    }
  }
  return result
}

const getUserLinkList = async (projectCode, userCode) => {
  return weixinService.listWeixinUserLinks(projectCode, userCode)
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
module.exports.getUserLinkList = getUserLinkList
module.exports.createUserLink = createUserLink