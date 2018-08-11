const config = require('config')
const Telegraf = require('telegraf')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({});

const telegraf = new Telegraf(config.telegram.token, {
  username: 'kong',
  telegram: { agent: socksAgent }
})

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
  telegraf.hears(/^inv[0-9a-z]{8}$/i, async ctx => {
    try {
      //  交由service处理接收到的信息
      const allMessage = ctx.message
      const inviteCode = allMessage.text
      const resultText = await telegramBotService.saveInviteCode(inviteCode, allMessage)
      ctx.reply(resultText)

      //  异步读取读取用户信息，然后交由service来更新数据库
      setTimeout( async () => {
        if(await telegramBotService.needUpdateUserInfo(inviteCode)){
          const userInfo = await fetchUserInfo(allMessage)
          telegramBotService.updateUserInfo(inviteCode, userInfo, socksAgent)
        }
      }, 0)
    } catch (err) {
      global.logger.error(err)
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
  console.log('====message: ' + JSON.stringify(message))
  const msgUser = message.from
  const photoObject = await telegram.getUserProfilePhotos(msgUser.id, 0, 1)
  console.log('====photoObject: ' + JSON.stringify(photoObject))
  if(!photoObject['total_count'] || photoObject['total_count'] < 1){
    return
  }
  const file = await telegram.getFile(photoObject.photos[0][0].file_id)
  const imageUrl = `${TELEGRAM_AVATAR_PREFIX}${config.telegram.token}${file.file_path}`

  return {
    firstName: msgUser.first_name,
    lastName: msgUser.last_name,
    avatar: imageUrl
  }
}

module.exports.startListen = startListen
module.exports.stopListen = stopListen