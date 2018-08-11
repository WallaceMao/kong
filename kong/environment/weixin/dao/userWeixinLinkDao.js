const UserWeixinLink = require('../domain/UserWeixinLink')

const findById = async id => {
  return UserWeixinLink.findById(id)
}

const findByUserCodeAndAppId = async (projectCode, userCode, appId) => {
  return UserWeixinLink.findOne({
    where: {
      projectCode: projectCode,
      userCode: userCode,
      appId: appId
    }
  })
}

const create = async (props) => {
  return UserWeixinLink.create(props)
}

module.exports.findById = findById
module.exports.findByUserCodeAndAppId = findByUserCodeAndAppId
module.exports.create = create