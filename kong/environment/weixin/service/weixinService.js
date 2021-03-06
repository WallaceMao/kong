const systemCode = require('@const/systemCode')
const { makeError } = require('@util/errorUtil')
const weixinAppService = require('./weixinAppService')
const weixinUserService = require('./weixinUserService')
const userWeixinLinkService = require('./userWeixinLinkService')
const requestUtil = require('../util/requestUtil')
const util = require('../util/urlUtil')
const jwtUtil = require('@util/jwtUtil')
const jwtUserVO = require('@vo/jwtUserVO')
const constant = require('../const')
const jssdkUtil = require('../util/jssdkUtil')

const getAuthUrl= async (projectCode, inviteCode) => {
  const link = await weixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  return util.getAuthPageUrl(inviteCode, link)
}

const saveWeixinUser = async (state, code) => {
  //  这里不要使用文本描述
  const stateArray = state.split('--')
  const projectCode = stateArray[0]
  const inviteCode = stateArray[1]
  const link = await weixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp || !link.project){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  const project = link.project
  const weixinApp = link.weixinApp
  const result = await requestUtil.getAccessTokenByCode(weixinApp, code)

  const openId = result.openId
  let weixinUser = await weixinUserService.getWeixinUserByOpenId(openId)

  let jwt
  if(!weixinUser){
    // 如果weixinUser不存在，那么就直接创建weixinUser
    const userFromWeixin = await requestUtil.getUserInfoByAccessToken(result.accessToken, openId)
    weixinUser = await weixinUserService.createWeixinUser(link.weixinApp.appId, userFromWeixin)
  }else{
    //  如果weixinUser存在
    //  检查weixinUser是否有绑定
    const weixinLinks = await userWeixinLinkService.listUserWeixinLinksByOpenId(projectCode, openId)
    /**
     * 注意，这里的weinxinLinks可能存在多条记录，即一个openId，可能关联多个账号。
     * 当且且当openId关联一个账号的时候，才会执行自动登录。
     * 其他情况，均跳转到登录页面，由用户去选择登录
     */
    if(weixinLinks && weixinLinks.length === 1){
      const link = weixinLinks[0]
      if(link.projectUser){
        // 签名jwt
        jwt = await jwtUtil.sign(jwtUserVO.render(link.projectUser))
      }
    }
  }

  const params = {}
  if(jwt){
    params.thirdParty = constant.NAME
    params.token = jwt
  }else{
    params.thirdParty = constant.NAME
    params.openId = openId
  }

  const frontendUrl = project.frontendRootUrl.replace('${projectCode}', projectCode).replace('${inviteCode}', inviteCode)
  return util.getProjectFrontendUrl(frontendUrl, params)
}

const listWeixinUserLinks = async (projectCode, userCode) => {
  const link = await weixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  const appId = link.weixinApp.appId

  return userWeixinLinkService.listUserWeixinLinksByUserCode(projectCode, userCode, appId)
}

const createWeixinUserLink = async (projectCode, userCode, openId) => {
  const link = await weixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  const appId = link.weixinApp.appId

  return userWeixinLinkService.createUserWeixinLink(projectCode, userCode, appId, openId)
}

const getJssdkConfig = async (projectCode, url) => {
  const link = await weixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  return jssdkUtil.getSignObject(link.weixinApp, url)
}

module.exports.getAuthUrl = getAuthUrl
module.exports.saveWeixinUser = saveWeixinUser
module.exports.listWeixinUserLinks = listWeixinUserLinks
module.exports.createWeixinUserLink = createWeixinUserLink
module.exports.getJssdkConfig = getJssdkConfig
