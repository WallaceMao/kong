const indexRouter = require('../route/index')
const projectAdmin = require('../route/projectAdmin')
const systemUser = require('../route/systemUser')

const init = app => {
  app.use('/', indexRouter)
  app.use('/v1/project/:projectCode/admin', projectAdmin)
  app.use('/v1/project/:projectCode/systemUser', systemUser)
}

module.exports.init = init