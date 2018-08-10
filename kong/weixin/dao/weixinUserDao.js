const WeixinUser = require('../domain/WeixinUser')

const findById = async id => {
  return WeixinUser.findById(id)
}

module.exports.findById = findById