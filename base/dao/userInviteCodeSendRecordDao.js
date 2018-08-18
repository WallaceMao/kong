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

const findAllBySenderId = async senderId => {
  return UserInviteCodeSendRecord.findAll({
    where: {
      inviteCodeSenderId: senderId
    }
  })
}

module.exports.create = create
module.exports.findByInviteCode = findByInviteCode
module.exports.findAllBySenderId = findAllBySenderId