global.logger = require('@config/logConfig').listenerLogger

const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const config = require('config')
const Promise = require('bluebird')

const telegramBotService = require('./service/telegramBotService')

const socksAgent = new SocksAgent({
  // socksHost: '127.0.0.1',
  // socksPort: '1080'
  // socksUsername: config.proxy.login,
  // socksPassword: config.proxy.psswd,
});

const bot = new Telegraf(config.telegram.token, {
  username: 'kong',
  telegram: { agent: socksAgent }
})

bot.start(ctx => {
  ctx.reply('Welcome, I am kong!')
})
bot.help(ctx => {
  ctx.reply('Send the invite code to me!')
})
bot.settings(ctx => {
  ctx.reply('Please contact the administrator.')
})
bot.hears(/^[0-9a-z]{6}$/i, async ctx => {
  try {
    const message = ctx.message
    const inviteCode = message.text
    if(!inviteCode){
      return ctx.reply(`NO INVITE CODE FOUND!`)
    }
    const isInvited = telegramBotService.checkRecordExist(inviteCode)

    if(isInvited){
      return ctx.reply(`invite code [${inviteCode}] is already used!`)
    }
    await telegramBotService.saveRecord(inviteCode, message)
    //  异步调用
    setTimeout(() => {
      Promise.all([
        telegramBotService.rewardUser(inviteCode),
        telegramBotService.updateUserInfo(inviteCode, ctx.telegram, message)
      ])
    }, 0)
    ctx.reply(`invite code [${message.text}] received!`)
  } catch (err) {
    global.logger.error(err)
    ctx.reply(`error occurred during receiving invite code, please contact the administrator`)
  }
})

bot.startPolling()