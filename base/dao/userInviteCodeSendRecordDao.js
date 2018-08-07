const UserInviteCodeSendRecord = require('../domain/UserInviteCodeSendRecord')

const create = async props => {
  return UserInviteCodeSendRecord.create(props)
}

const findByInviteCode = async inviteCode => {
  return UserInviteCodeSendRecord.findOne({
    where: {
      inviteCode: inviteCode
    }
  })
}

module.exports.create = create
module.exports.findByInviteCode = findByInviteCode