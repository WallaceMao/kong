const request = require('request-promise')

const { makeError } = require('@util/errorUtil')
const systemCode = require('@const/systemCode')
const urlUtil = require('./urlUtil')

const getAccessTokenByCode = async (weixinApp, code) => {
  const url = urlUtil.getOauthAccessTokenUrl(weixinApp, code)
  const body = await request({ uri: url, json: true })
  if(body.errcode){
    throw makeError(systemCode.SYS_ERROR, `getAccessTokenByCode result: ${JSON.stringify(body)}`)
  }
  return {
    accessToken: body.access_token,
    openId: body.openid
  }
}

const getUserInfoByAccessToken = async (accessToken, openId) => {
  const url = urlUtil.getUserInfoUrl(accessToken, openId)
  const body = await request({uri: url, json: true})
  if(body.errcode){
    throw makeError(systemCode.SYS_ERROR, `getUserInfoByAccessToken result: ${JSON.stringify(body)}`)
  }
  return {
    openId: body.openid,
    nickname: body.nickname,
    sex: body.sex,
    language: body.language,
    city: body.city,
    province: body.province,
    country: body.country,
    headImgUrl: body.headimgurl
  }
}

const getJssdkAccessToken = async (weixinApp) => {
  const url = urlUtil.getCommonAccessTokenUrl(weixinApp)
  const body = await request({uri: url, json: true})
  if(body.errcode){
    throw makeError(systemCode.SYS_ERROR, `getJssdkAccessToken result: ${JSON.stringify(body)}`)
  }
  return {
    accessToken: body.access_token,
    expiresIn: body.expires_in
  }
}

const getJssdkApiTicket = async (accessToken) => {
  const url = urlUtil.getJssdkApiTicketUrl(accessToken)
  console.log('====url is: ' + url)
  const body = await request({uri: url, json: true})
  if(body.errcode){
    throw makeError(systemCode.SYS_ERROR, `getJssdkApiTicket result: ${JSON.stringify(body)}`)
  }
  return {
    ticket: body.ticket,
    expiresIn: body.expires_in
  }
}

module.exports.getAccessTokenByCode = getAccessTokenByCode
module.exports.getUserInfoByAccessToken = getUserInfoByAccessToken
module.exports.getJssdkAccessToken = getJssdkAccessToken
module.exports.getJssdkApiTicket = getJssdkApiTicket