const UserWeixinLink = require('../domain/UserWeixinLink')
const UserInfo = require('@base/domain/UserInfo')

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

const findAllByOpenId = async (projectCode, openId) => {
  return UserWeixinLink.findAll({
    where: {
      projectCode: projectCode,
      openId: openId
    },
    include: [{
      required: true,
      as: 'projectUser',
      model: UserInfo
    }]
  })
}

const create = async (props) => {
  return UserWeixinLink.create(props)
}

module.exports.findById = findById
module.exports.findAllByUserCodeAndAppId = findAllByUserCodeAndAppId
module.exports.findAllByOpenId = findAllByOpenId
module.exports.create = create