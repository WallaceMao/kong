const weixinUserDao = require('../dao/weixinUserDao')

const getWeixinUserByOpenId = async openId => {
  return weixinUserDao.findByOpenId(openId)
}

const createWeixinUser = async (appId, props) => {
  props.appId = appId
  return weixinUserDao.create(props)
}

module.exports.getWeixinUserByOpenId = getWeixinUserByOpenId
module.exports.createWeixinUser = createWeixinUser