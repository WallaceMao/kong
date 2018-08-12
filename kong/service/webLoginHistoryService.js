const userLoginHistoryService = require('@serv/userLoginHistoryService')

const saveLoginHistory = async (req, loginUser, thirdParty) => {
  userLoginHistoryService.saveHistory(
    loginUser.projectCode,
    loginUser.userCode,
    loginUser.loginType,
    req.ip,
    req.useragent.source,
    thirdParty
  ).catch(err => {
    // 不将错误返回前台，只记录错误
    global.logger.error('login history save error url: %s, body: %s \nerr: %s', req.url, JSON.stringify(req.body), err.stack)
  })
}

module.exports.saveLoginHistory = saveLoginHistory