const indexRouter = require('../route/index')
const projectAdmin = require('../route/projectAdmin')
const seedUser = require('../route/seedUser')

const init = app => {

  app.use('/', indexRouter)
  app.use('/v1/project/:projectCode/admin', projectAdmin)
  app.use('/v1/project/:projectCode/seedUser', seedUser)
}

module.exports.init = init