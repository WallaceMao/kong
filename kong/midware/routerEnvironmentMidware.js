const environmentManager = require('../environment/manager')

const init = app => {
  environmentManager.init(app)
}

module.exports.init = init