const redisUtil = require('../util/redisUtil')
const constant = require('../constant/constant')

const publisher = redisUtil.getClient('mqPublisher')

/**
 * 发送消息
 * @param msg
 * @param channel
 */
const send = async (msg, channel) => {
  channel = channel || constant.MESSAGE_QUEUE_CHANNEL
  publisher.publish(channel, msg)
}

module.exports.send = send