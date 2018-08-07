const expect = require('chai').expect

const request = require('request')

describe('ossTest', function() {
  describe('ossTest#indexOf()', function() {
    it('should upload to aliyun OSS successfully', function() {
      //  https://api.telegram.org/file/bot696033507:AAGvRBRxy7xAKoE5KWTfTQ6MVg5p_xt8NBc/photos/file_0.jpg
      // const imageUrl = 'https://api.telegram.org/file/bot696033507:AAGvRBRxy7xAKoE5KWTfTQ6MVg5p_xt8NBc/photos/file_0.jpg'
      const imageUrl = 'https://www.rishiqing.com/web/upload/201805/1525767502.png'
      // request(imageUrl).pipe(fs.createWriteStream('doodle.png'))
      // request(imageUrl)
      putStream('doodle3.png', request(imageUrl))
    });
  });
});