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
const getAuthPageUrl = (projectCode, inviteCode, weixinApp) => {
  const root = constant.WEB_AUTH_ROOT
  const paramsString = combineParams({
    appid: weixinApp.appId,
    redirect_uri: encodeURIComponent(config.weixin.webAuthRedirectUrl),
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: `${projectCode}--${inviteCode}`
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

module.exports.getAuthPageUrl = getAuthPageUrl
module.exports.getOauthAccessTokenUrl = getOauthAccessTokenUrl
module.exports.getUserInfoUrl = getUserInfoUrl
module.exports.getProjectFrontendUrl = getProjectFrontendUrl