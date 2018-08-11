const WeixinApp = require('../domain/WeixinApp')

const findById = async id => {
  return WeixinApp.findById(id)
}

module.exports.findById = findById
