require('module-alias')()
global.logger = require('@config/logConfig').telegramLogger

const bot = require('./telegram-bot')

bot.startListen()

