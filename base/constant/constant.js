const config = require('config')

module.exports = {
  ID_CODE_LENGTH: 8,
  VALIDATE_CODE_LENGTH: 6,
  INVITE_CODE_LENGTH: 8,
  VALIDATE_CODE_EXPIRED_SECONDS: 1200,
  MESSAGE_QUEUE_CHANNEL: 'sendPhoneCode',
  AUTH_JWT_EXPIRED_SECONDS: 1800,
  DEFAULT_UNIT: 'BT',
  VALIDATE_CODE_CACHE_PREFIX: 'validate_code_',
  VALIDATE_CODE_SEPARATOR: ':',
  INVITE_CODE_LIMIT_PER_SENDER: 2,
  DEFAULT: {
    AVATAR: `${config.oss.baseReadRoot}/default-avatar.png`,
    SHARE_IMAGE_URL:`${config.oss.baseReadRoot}/default-share-image.png`,
    TELE_GROUP_NAME: '电报群',
    SHARE_TITLE: '送你一个大红包',
    SHARE_DESC: '点击领取红包'
  }
}