const UserLoginHistory = require('../domain/UserLoginHistory')

const create = async props => {
  return UserLoginHistory.create(props)
}

module.exports.create = create