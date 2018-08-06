const UserRewardRecord = require('../domain/UserRewardRecord')

const create = async props => {
  return UserRewardRecord.create(props)
}

module.exports.create = create