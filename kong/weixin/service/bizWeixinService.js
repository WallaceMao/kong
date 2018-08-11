const systemCode = require('@const/systemCode')
const { makeError } = require('@util/errorUtil')
const projectService = require('@serv/projectService')
const weixinAppService = require('./weixinAppService')
const weixinUserService = require('./weixinUserService')
const requestUtil = require('../util/requestUtil')
const util = require('../util/urlUtil')
const jwtUtil = require('@util/jwtUtil')
const jwtUserVO = require('@vo/jwtUserVO')

const getAuthUrl= async projectCode => {
  const link = await weixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  return util.getAuthPageUrl(projectCode, link.weixinApp)
}

const saveWeixinUser = async (projectCode, code) => {
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
    const weixinLink = await weixinUserService.getUserWeixinLink(openId)
    if(weixinLink && weixinLink.projectUser){
      // 如果weixinUser有绑定user，那么签名jwt
      jwt = await jwtUtil.sign(jwtUserVO.render(weixinLink.projectUser))
    }
  }

  const params = {}
  if(jwt){
    params.token = jwt
  }else{
    params.openId = openId
  }

  return util.getProjectFrontendUrl(project.frontendRootUrl, params)
}

module.exports.getAuthUrl = getAuthUrl
module.exports.saveWeixinUser = saveWeixinUser
module.exports.getWeixinFrontendIndexUrl = getWeixinFrontendIndexUrl