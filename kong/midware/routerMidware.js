const indexRouter = require('../route/index')
const commonUser = require('../route/commonUser')
const project = require('../route/project')
const invite = require('../route/invite')
const weixinRoute = require('../weixin/route')
const weixinRedirectRoute = require('../weixin/route/redirect')

const init = app => {
  app.use('/', indexRouter)
  app.use('/v1/project/:projectCode/my', commonUser)
  app.use('/v1/project/:projectCode/info', project)
  app.use('/v1/project/:projectCode/inviteInfo', invite)
  app.use('/v1/project/:projectCode/weixin', weixinRoute)
  app.use('/v1/weixinCallback', weixinRedirectRoute)
}

module.exports.init = init