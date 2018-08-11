const WeixinUser = require('../domain/WeixinUser')

const findById = async id => {
  return WeixinUser.findById(id)
}

const findByOpenId = async openId => {
  return WeixinUser.findOne({
    where: {
      openId: openId
    }
  })
}

const create = async props => {
  return WeixinUser.create(props)
}

module.exports.findById = findById
module.exports.findByOpenId = findByOpenId
module.exports.create = create