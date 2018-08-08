require('module-alias')()
global.logger = require('@config/logConfig').telegramLogger

const config = require('config')
const expect = require('chai').expect

const Telegram = require('telegraf/telegram')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({
  // socksHost: '127.0.0.1',
  // socksPort: '1080'
  // socksUsername: config.proxy.login,
  // socksPassword: config.proxy.psswd,
});

const bot = new Telegram(config.telegram.token, {
  username: 'kong',
  telegram: { agent: socksAgent }
})

const telegramBotService = require('../../../telegram-bots/service/telegramBotService')

const message = {
  "message_id":52,
  "from":{
    "id":625002836,
    "is_bot":false,
    "first_name":"Wallace",
    "last_name":"Mao",
    "language_code":"zh-CN"
  },
  "chat":{
    "id":-262401159,
    "title":"空投小组",
    "type":"group",
    "all_members_are_administrators":true
  },
  "date":1533639111,
  "text":"invmYNWi3VN"
}

describe('telegram-bot server test', () => {
  describe.skip('checkRecordExist function test', () => {
    it('should success', async () => {
      const exist = await telegramBotService.checkRecordExist('mYNWi3VN')
      expect(exist).to.equal(false)
    })
  })
  describe.skip('saveRecord function test', () => {
    it('should success', async () => {

      const record = await telegramBotService.saveRecord('mYNWi3VN', message)
      expect(record.inviteCode).to.equal('mYNWi3VN')
      expect(record.inviteCodeSendMsg).to.equal(JSON.stringify(message))
      expect(record.inviteCodeSendSource).to.equal('telegram')
    })
  })
  describe.skip('rewardUser function test', () => {
    it('should success', async () => {
      await telegramBotService.rewardUser('mYNWi3VN')
    })
  })
  describe('updateUserInfo function test', () => {
    it('should success', async () => {
      await telegramBotService.updateUserInfo('mYNWi3VN', bot, message)
    })
  })
})