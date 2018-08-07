const expect = require('chai').expect

const smsUtil = require('../../../base/util/smsUtil')

describe('smsUtilTest', () => {
  describe('send short message', () => {
    it('should send short message successfully', async () => {
      const result = await smsUtil.sendValidateCode('13810360752', '987654')
      expect(result).to.equal('success')
    })
  })
})