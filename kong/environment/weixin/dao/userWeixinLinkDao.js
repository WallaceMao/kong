const UserWeixinLink = require('../domain/UserWeixinLink')

const findById = async id => {
  return UserWeixinLink.findById(id)
}

const findAllByUserCodeAndAppId = async (projectCode, userCode, appId) => {
  return UserWeixinLink.findAll({
    where: {
      projectCode: projectCode,
      userCode: userCode,
      appId: appId
    }
  })
}

const findAllByOpenId = async (openId) => {
  return UserWeixinLink.findAll({
    where: {
      openId: openId
    }
  })
}

const create = async (props) => {
  return UserWeixinLink.create(props)
}

module.exports.findById = findById
module.exports.findAllByUserCodeAndAppId = findAllByUserCodeAndAppId
module.exports.findAllByOpenId = findAllByOpenId
module.exports.create = create