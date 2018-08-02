const indexRouter = require('../routes/index')
const projectAdmin = require('../routes/projectAdmin')
const systemUser = require('../routes/systemUser')
const commonUser = require('../routes/commonUser')
const project = require('../routes/project')
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