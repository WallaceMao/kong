require('module-alias')()

const expect = require('chai').expect

const userInviteInfoService = require('@serv/userInviteInfoService')

describe('userInfoServiceTest', () => {
  describe('updateUserInfo', () => {
    it.skip('should success', async () => {
      const userInfo = await userInfoService.updateUserInfo({
        name: 'aaaaa',
        avatar: 'https://www.rishiqing.com'
      })
      expect(userInfo.name).to.equal('aaaaa')
    })
    it('should success', async () => {
      const userInviteInfo = await userInviteInfoService.getUserInviteInfoByInviteCode('invGPZXdtYQ')
      console.log('----userInfo----' + JSON.stringify(userInviteInfo))
      expect(userInviteInfo.userInfo).not.to.be.null
    })
  })
})