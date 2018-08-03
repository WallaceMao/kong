const indexRouter = require('../route/index')
const projectAdmin = require('../../kong-back/route/projectAdmin')
const systemUser = require('../../kong-back/route/systemUser')
const commonUser = require('../route/commonUser')
const project = require('../route/project')
// const usersRouter = require('../routes/users')
// const v1ApiRouter = require('../routes/v1Api')

const init = app => {
  app.use('/', indexRouter)
  app.use('/v1/project/:projectCode/admin', projectAdmin)
  app.use('/v1/project/:projectCode/systemUser', systemUser)
  app.use('/v1/project/:projectCode/my', commonUser)
  app.use('/v1/project/:projectCode/info', project)
  // app.use('/v1', v1ApiRouter)
  // app.use('/users', usersRouter)
}

module.exports.init = init