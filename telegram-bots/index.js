require('module-alias/register')
global.logger = require('@config/logConfig').telegramLogger

const bot = require('./telegramBot')

bot.startListen()

