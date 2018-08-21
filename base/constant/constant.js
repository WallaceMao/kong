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
  DEFAULT_AVATAR: `${config.oss.baseReadRoot}/default-avatar.png`,
  INVITE_CODE_LIMIT_PER_SENDER: 2
}