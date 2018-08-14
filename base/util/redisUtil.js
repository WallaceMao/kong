const redis = require('redis')
const config = require('config').get('redis')
const Promise = require("bluebird")
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const getClient = label => {
  label = label || 'default'
  const options = {
    host: config.host,
    port: config.port
  }
  if(config.auth){
    options.password = config.auth
  }
  const client = redis.createClient(options)

  client.on("error", err => {
    global.logger.error('[%s] redis client error: %s', label, err);
  });

  return client
}

module.exports.getClient = getClient
