const path = require('path')
const { createLogger, format, transports } = require('winston')
const { combine, splat, timestamp, simple } = format
const config = require('config')

const serverPrefix = 'server-'
const projectAdminServerPrefix = 'server-pa-'
const listenerPrefix = 'listener-'
const telegramPrefix = 'telegram-'
const rateLimitPrefix = 'rate-limit-'


const generateProps = (fileNamePrefix) => {
  const transportsArray = []
  // const exceptionHandlersArray = []
  const outputPath = config.log.outputPath
  //  如果有路径，那么就输出到路径中
  if(outputPath){
    transportsArray.push(
      new transports.File({
        filename: path.join(outputPath, fileNamePrefix + 'common.log'),
        handleExceptions: true
      })
    )
    // exceptionHandlersArray.push(
    //   new transports.File({
    //     filename: path.join(outputPath, fileNamePrefix + 'exception.log')
    //   })
    // )
  }else{
    transportsArray.push(new transports.Console({
      handleExceptions: true
    }))
    // exceptionHandlersArray.push(new transports.Console())
  }
  return {
    level: config.log.level,
    format: combine(
      splat(),
      timestamp(),
      simple()
    ),
    transports: transportsArray
    // exceptionHandlers: exceptionHandlersArray
  }
}

module.exports.serverLogger = createLogger(generateProps(serverPrefix))
module.exports.projectAdminServerLogger = createLogger(generateProps(projectAdminServerPrefix))
module.exports.listenerLogger = createLogger(generateProps(listenerPrefix))
module.exports.telegramLogger = createLogger(generateProps(telegramPrefix))
module.exports.rateLimitlogger = createLogger(generateProps(rateLimitPrefix))
