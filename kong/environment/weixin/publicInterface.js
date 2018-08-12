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

const getUserLink = async (projectCode, userCode) => {
  const link = await weixinService.getWeixinUserLink(projectCode, userCode)
  let result = null
  if(link){
    result = {
      projectCode: link.projectCode,
      userCode: link.userCode,
      appId: link.appId,
      openId: link.openId
    }
  }
  return result
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