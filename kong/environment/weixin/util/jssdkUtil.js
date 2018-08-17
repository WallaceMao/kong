const request = require('request-promise')

const redisUtil = require('@util/redisUtil')
const randomUtil = require('@util/randomUtil')
const constant = require('../const')
const requestUtil = require('./requestUtil')

const redisClient = redisUtil.getClient('jssdk')

const fetchAndSaveToken = async (weixinApp) => {
  const json = await requestUtil.getJssdkAccessToken(weixinApp)
  const cachedObject = {
    token: json,
    time: new Date().getTime()
  }
  console.log(`========accessToken from weixin: ${JSON.stringify(cachedObject)}`)
  await redisClient.setAsync(`${constant.JSSDK_TOKEN_CACHE_PREFIX}${weixinApp.appId}`, JSON.stringify(cachedObject))
  return json.accessToken
}

const getJssdkAccessToken = async (weixinApp) => {
  const cachedData = await redisClient.getAsync(`${constant.JSSDK_TOKEN_CACHE_PREFIX}${weixinApp.appId}`)
  console.log(`========accessToken in cache: ${cachedData}, appId: ${weixinApp.appId}`)

  if(!cachedData){
    return fetchAndSaveToken(weixinApp)
  }else{
    const tokenObject = JSON.parse(cachedData)
    //  超过过期时间，需要刷新
    if(new Date().getTime() - tokenObject.time > 1000 * (tokenObject.token.expiresIn - constant.COMMON_REFRESH_IN_ADVANCE_SECONDS)){
      return fetchAndSaveToken(weixinApp)
    }else{
      return tokenObject.token.accessToken
    }
  }
}

const fetchAndSaveTicket = async (weixinApp) => {
  const accessToken = await getJssdkAccessToken(weixinApp)
  const json = await requestUtil.getJssdkApiTicket(accessToken)
  const cachedObject = {
    ticket: json,
    time: new Date().getTime()
  }
  console.log(`========ticket from weixin: ${JSON.stringify(cachedObject)}`)
  await redisClient.setAsync(`${constant.JSSDK_TICKET_CACHE_PREFIX}${weixinApp.appId}`, JSON.stringify(cachedObject))
  return json.ticket
}

const getJssdkTicket = async (weixinApp) => {
  const cachedData = await redisClient.getAsync(`${constant.JSSDK_TICKET_CACHE_PREFIX}${weixinApp.appId}`)
  console.log(`========ticket in cache: ${cachedData}, appId: ${weixinApp.appId}`)

  if(!cachedData){
    return fetchAndSaveTicket(weixinApp)
  }else{
    const ticketObject = JSON.parse(cachedData)
    //  超过过期时间，需要刷新
    if(new Date().getTime() - ticketObject.time > 1000 * (ticketObject.ticket.expiresIn - constant.COMMON_REFRESH_IN_ADVANCE_SECONDS)){
      return fetchAndSaveTicket(weixinApp)
    }else{
      return ticketObject.ticket.ticket
    }
  }
}

const combine = (args) => {
  let keys = Object.keys(args);
  keys = keys.sort();
  const argsArray = [];
  keys.forEach(key => {
    argsArray.push(`${key.toLowerCase()}=${args[key]}`)
  });
  return argsArray.join('&');
};

const sign = async (ticket, url, nonceString, timestamp) => {
  const result = {
    jsapi_ticket: ticket,
    nonceStr: nonceString,
    timestamp: timestamp,
    url: url
  }
  const str = combine(result)
  console.log(`combined: ${str}`)
  const jsSHA = require('jssha');
  const shaObj = new jsSHA('SHA-1', 'TEXT');  //new jsSHA(string, 'TEXT');
  shaObj.update(str);
  result.signature = shaObj.getHash("HEX");  //shaObj.getHash('SHA-1', 'HEX');
  return result;
}


const getSignObject = async (weixinApp, url) => {
  const nonceString = await randomUtil.generateRandomString()
  const timestamp = `${Math.floor(new Date().getTime() / 1000)}`
  const ticket = await getJssdkTicket(weixinApp)
  const signObject = await sign(ticket, url, nonceString, timestamp)
  return {
    appId: weixinApp.appId,
    timestamp: signObject.timestamp,
    nonceStr: signObject.nonceStr,
    signature: signObject.signature
  }
}

module.exports.getSignObject = getSignObject