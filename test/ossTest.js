require('module-alias')()

const expect = require('chai').expect

const request = require('request')
const SocksAgent = require('socks5-https-client/lib/Agent')

const ossUtil = require('@util/ossUtil')

const socksAgent = new SocksAgent({
  // socksHost: '127.0.0.1',
  // socksPort: '1080'
  // socksUsername: config.proxy.login,
  // socksPassword: config.proxy.psswd,
});

describe('ossTest', function() {
  describe('ossTest#indexOf()', function() {
    it('should upload to aliyun OSS successfully', async function() {
      //  https://api.telegram.org/file/bot696033507:AAGvRBRxy7xAKoE5KWTfTQ6MVg5p_xt8NBc/photos/file_0.jpg
      // const imageUrl = 'https://api.telegram.org/file/bot696033507:AAGvRBRxy7xAKoE5KWTfTQ6MVg5p_xt8NBcphotos/file_1.jpg'
      const imageUrl = 'https://www.rishiqing.com/web/upload/201805/1525767502.png'
      // request(imageUrl).pipe(fs.createWriteStream('doodle.png'))
      // request(imageUrl)
      const result = await ossUtil.streamUpload('profile/abcdefg/4a346f72/avatar.png', request({
        url: imageUrl,
        agent: socksAgent
      }).on('response', (resp) => {
        console.log('headers: ' + JSON.stringify(resp.headers))
        resp.headers['content-type'] = 'image/jpeg'
      }))
    });
  });
});