require('module-alias/register')
global.logger = require('@config/logConfig').listenerLogger

require('./boot-check').check()

const listener = require('./mq/mqSubscriber')
listener.startListen()
