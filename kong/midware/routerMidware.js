const indexRouter = require('../route/index')
const commonUser = require('../route/commonUser')
const project = require('../route/project')
const invite = require('../route/invite')

const routerEnvironmentMidware = require('./routerEnvironmentMidware')

const init = app => {
  app.use('/', indexRouter)
  app.use('/v1/project/:projectCode/my', commonUser)
  app.use('/v1/project/:projectCode/info', project)
  app.use('/v1/project/:projectCode/inviteInfo', invite)

  // 加载前端环境相关的router
  routerEnvironmentMidware.init(app)
}

module.exports.init = init