const config = require('config')
const constant = require('../const')

const combineParams = paramsMap => {
  const arr = []
  for(let key in paramsMap){
    if(paramsMap.hasOwnProperty(key)){
      arr.push(`${key}=${paramsMap[key]}`)
    }
  }
  return arr.join('&')
}
const getAuthPageUrl = (inviteCode, link) => {
  const root = constant.WEB_AUTH_ROOT
  const weixinApp = link.weixinApp
  const project = link.project
  const paramsString = combineParams({
    appid: weixinApp.appId,
    redirect_uri: encodeURIComponent(link.webAuthCallbackUrl),
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: `${project.projectCode}--${inviteCode}`
  })

  return `${root}?${paramsString}#wechat_redirect`
}

const getOauthAccessTokenUrl = (weixinApp, code) => {
  const root = constant.OAUTH_ACCESS_TOKEN_ROOT
  const paramsString = combineParams({
    appid: weixinApp.appId,
    secret: weixinApp.appSecret,
    code: code,
    grant_type: 'authorization_code'
  })

  return `${root}?${paramsString}`
}

const getUserInfoUrl = (accessToken, openId) => {
  const root = constant.USER_INFO_ROOT
  const paramsString = combineParams({
    access_token: accessToken,
    openid: openId,
    lang: 'zh_CN'
  })
  return `${root}?${paramsString}`
}

const getProjectFrontendUrl = (root, params) => {
  const obj = {
    thirdParty: params.thirdParty
  }
  if(params.openId){
    obj.openId = params.openId
  }else if (params.token){
    obj.token = params.token
  }
  const paramsString = combineParams(obj)
  return `${root}?${paramsString}`
}

const getCommonAccessTokenUrl = (weixinApp) => {
  const root = constant.COMMON_ACCESS_TOKEN_ROOT
  const params = {
    grant_type: 'client_credential',
    appid: weixinApp.appId,
    secret: weixinApp.appSecret
  }
  return `${root}?${combineParams(params)}`
}

const getJssdkApiTicketUrl = (accessToken) => {
  const root = constant.JSSDK_API_TICKET_ROOT
  const params = {
    access_token: accessToken,
    type: 'jsapi'
  }
  return `${root}?${combineParams(params)}`
}

module.exports.getAuthPageUrl = getAuthPageUrl
module.exports.getOauthAccessTokenUrl = getOauthAccessTokenUrl
module.exports.getUserInfoUrl = getUserInfoUrl
module.exports.getProjectFrontendUrl = getProjectFrontendUrl
module.exports.getCommonAccessTokenUrl = getCommonAccessTokenUrl
module.exports.getJssdkApiTicketUrl = getJssdkApiTicketUrl