const config = require('config')

const init = app => {
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.cors.allowOrigin)
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
  })
}

module.exports.init = init
