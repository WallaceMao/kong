const config = require('config')
const constant = require('../const')

const getAuthPageUrl = (projectCode, weixinApp) => {
  const root = constant.WEB_AUTH_ROOT
  const params = {
    appid: weixinApp.appId,
    redirect_uri: encodeURIComponent(config.weixin.webAuthRedirectUrl),
    response_type: 'code',
    scope: 'snsapi_base',
    state: projectCode
  }
  const array = []
  for(let key in params){
    if(params.hasOwnProperty(key)){
      array.push(`${key}=${params[key]}`)
    }
  }

  return `${root}?${array.join('&')}#wechat_redirect`
}

module.exports.getAuthPageUrl = getAuthPageUrl