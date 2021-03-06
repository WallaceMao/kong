const config = require('config')
const constant = require('@const/constant')
const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = config.telegram.useAgent ? new SocksAgent({}) : null;

const telegraf = new Telegraf(config.telegram.token, {
  username: 'kong',
  telegram: { agent: socksAgent }
})
const inviteCodeReg = new RegExp(`^inv[0-9a-zA-Z]{${constant.INVITE_CODE_LENGTH}}$`, 'g')

const telegramBotService = require('./service/telegramBotService')

const TELEGRAM_AVATAR_PREFIX = 'https://api.telegram.org/file/bot'

const startListen = () => {
  telegraf.start(ctx => {
    ctx.reply('Welcome, I am kong!')
  })
  telegraf.help(ctx => {
    ctx.reply('Send the invite code to me!')
  })
  telegraf.settings(ctx => {
    ctx.reply('Please contact the administrator.')
  })
  /**
   * 监听验证码信息
   */
  telegraf.hears(inviteCodeReg, async ctx => {
    try {
      //  交由service处理接收到的信息
      const allMessage = ctx.message
      const inviteCode = allMessage.text
      const resultText = await telegramBotService.saveInviteCode(inviteCode, allMessage)
      if(!resultText){
        return global.logger.warn(`invalid invite code: ${JSON.stringify(allMessage)}`)
      }
      ctx.reply(resultText)

      //  异步读取读取用户信息，然后交由service来更新数据库
      setTimeout( async () => {
        try {
            if(await telegramBotService.needUpdateUserInfo(inviteCode)){
                const userInfo = await fetchUserInfo(allMessage)
                telegramBotService.updateUserInfo(inviteCode, userInfo, socksAgent)
            }
        } catch (err) {
          global.logger.error(err.stack)
          ctx.reply(`error updating user information, please contact the administrator`)
        }
      }, 0)
    } catch (err) {
      global.logger.error(err.stack)
      ctx.reply(`error occurred during receiving invite code, please contact the administrator`)
    }
  })

  telegraf.startPolling()
}

const stopListen = () => {
  telegraf.stop()
}

/**
 * 获取用户信息
 * @param message
 * @returns {Promise<void>}
 */
const fetchUserInfo = async message => {
  const telegram = telegraf.telegram
  // 获取telegram中的用户头像
  const msgUser = message.from
  const photoObject = await telegram.getUserProfilePhotos(msgUser.id, 0, 1)
  let imageUrl = null
  if(photoObject['total_count'] && photoObject['total_count'] > 0){
    const file = await telegram.getFile(photoObject.photos[0][0].file_id)
    imageUrl = `${TELEGRAM_AVATAR_PREFIX}${config.telegram.token}/${file.file_path}`
  }
  return {
    firstName: msgUser.first_name,
    lastName: msgUser.last_name,
    avatar: imageUrl
  }
}

module.exports.startListen = startListen
module.exports.stopListen = stopListen