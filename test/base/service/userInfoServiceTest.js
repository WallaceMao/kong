require('module-alias')()

const expect = require('chai').expect

const userInfoService = require('@serv/userInfoService')

describe('userInfoServiceTest', () => {
  describe('updateUserInfo', () => {
    it('should success', async () => {
      const userInfo = await userInfoService.updateUserInfo({
        name: 'aaaaa',
        avatar: 'https://www.rishiqing.com'
      })
      expect(userInfo.name).to.equal('aaaaa')
    })
  })
})