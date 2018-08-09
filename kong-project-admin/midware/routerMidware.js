const indexRouter = require('../route/index')
const projectAdmin = require('../route/projectAdmin')
const seedUser = require('../route/seedUser')
const summary = require('../route/summary')

const init = app => {

  app.use('/', indexRouter)
  app.use('/v1/project/:projectCode/admin', projectAdmin)
  app.use('/v1/project/:projectCode/seedUser', seedUser)
  app.use('/v1/project/:projectCode/summary', summary)
}

module.exports.init = init