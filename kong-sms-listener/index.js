require('module-alias/register')

global.logger = require('@config/logConfig').listenerLogger

const listener = require('./mq/mqSubscriber')

listener.startListen()
