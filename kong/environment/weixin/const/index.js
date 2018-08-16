module.exports = {
  NAME: 'weixin',
  WEB_AUTH_ROOT: 'https://open.weixin.qq.com/connect/oauth2/authorize',
  OAUTH_ACCESS_TOKEN_ROOT: 'https://api.weixin.qq.com/sns/oauth2/access_token',
  USER_INFO_ROOT: 'https://api.weixin.qq.com/sns/userinfo',
  COMMON_ACCESS_TOKEN_ROOT: 'https://api.weixin.qq.com/cgi-bin/token',
  JSSDK_API_TICKET_ROOT: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
  COMMON_REFRESH_IN_ADVANCE_SECONDS: 60,  //  刷新token的提前量，一般token的超时时间为7200秒，提前量可以设置为60秒
  JSSDK_TOKEN_CACHE_PREFIX: 'weixin_access_token_',
  JSSDK_TICKET_CACHE_PREFIX: 'weixin_jssdk_ticket_'
}