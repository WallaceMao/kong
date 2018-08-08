require('module-alias/register')

global.logger = require('@config/logConfig').projectAdminServerLogger

const config = require('config')
const http = require('http')
const debug = require('debug')('kong-back:server')
const app = require('./app')

const port = config.web.kongBack.port
app.set('port', port)

const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {

  const bind = `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      global.logger.error(`${bind} requires elevated privileges`)
      throw new Error(`${bind} requires elevated privileges`)
    case 'EADDRINUSE':
      global.logger.error(`${bind} is already in use`)
      throw new Error(`${bind} is already in use`)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const bind = `port ${server.address().port}`
  debug(`Listening on ${bind}`)
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
