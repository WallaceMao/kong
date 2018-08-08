require('module-alias/register')
global.logger = require('@config/logConfig').telegramLogger

require('./boot-check').check()

const bot = require('./telegramBot')
bot.startListen()

