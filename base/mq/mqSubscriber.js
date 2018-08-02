const redisUtil = require('../util/redisUtil')
const constant = require('../constant/constant')

const subscriber = redisUtil.getClient('mqSubscriber')

const startListen = async channel => {
  channel = channel || constant.MESSAGE_QUEUE_CHANNEL

  subscriber.on('subscribe', (channel, count) => {
    global.info('listen on channel: ' + channel + ', count: ' + count)
  })

  subscriber.on('message', (channel, message) => {
    global.info('received message: ' + message + ', channel: ' + channel)
  })

  subscriber.subscribe(channel)
}

const stopListen = async () => {
  subscriber.unsubscribe()
  subscriber.quit()
}

module.exports.startListen = startListen
module.exports.stopListen = stopListen