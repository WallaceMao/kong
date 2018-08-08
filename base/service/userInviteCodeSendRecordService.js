const userInviteCodeSendRecordDao = require('../dao/userInviteCodeSendRecordDao')

const getRecordByInviteCode = async inviteCode => {
  return userInviteCodeSendRecordDao.findByInviteCode(inviteCode)
}

const createRecord = async (inviteCode, inviteCodeSendMsg, inviteCodeSendSource) => {
  return userInviteCodeSendRecordDao.create({
    inviteCode: inviteCode,
    inviteCodeSendMsg: inviteCodeSendMsg,
    inviteCodeSendSource: inviteCodeSendSource
  })
}

module.exports.getRecordByInviteCode = getRecordByInviteCode
module.exports.createRecord = createRecord