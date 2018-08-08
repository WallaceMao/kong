const config = require('config')

const init = app => {
  app.all('/', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', config.cors.allowOrigin)
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
  })
}

module.exports.init = init
