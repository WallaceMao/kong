const UserRelation = require('../domain/UserRelation')
const UserInfo = require('../domain/UserInfo')

const findAllByUpUserCode = async (projectCode, upUserCode) => {
  return UserRelation.findAll({
    where: {
      projectCode: projectCode,
      upUserCode: upUserCode
    },
    include: [{
      required: true,  // 使用inner join
      model: UserInfo,
      as: 'downUser'  // 与UserRelation中的关系别名对应
    }]
  })
}

const create = async props => {
  return UserRelation.create(props)
}

module.exports.findAllByUpUserCode = findAllByUpUserCode
module.exports.create = create