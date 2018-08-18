const userInviteCodeSendRecordDao = require('../dao/userInviteCodeSendRecordDao')

const getRecordByInviteCode = async inviteCode => {
  return userInviteCodeSendRecordDao.findByInviteCode(inviteCode)
}

const listRecordBySenderId = async senderId => {
  return userInviteCodeSendRecordDao.findAllBySenderId(senderId)
}

const createRecord = async (inviteCode, inviteCodeSendMsg, inviteCodeSendSource) => {
  return userInviteCodeSendRecordDao.create({
    inviteCode: inviteCode,
    inviteCodeSendMsg: inviteCodeSendMsg,
    inviteCodeSendSource: inviteCodeSendSource
  })
}

module.exports.getRecordByInviteCode = getRecordByInviteCode
module.exports.listRecordBySenderId = listRecordBySenderId
module.exports.createRecord = createRecord