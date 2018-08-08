const userInviteInfoDao = require('../dao/userInviteInfoDao')
const randomUtil = require('../util/randomUtil')
const userInviteInfoConst = require('../constant/userInvite')
const errorUtil = require('../util/errorUtil')
const systemCode = require('../constant/systemCode')

const createUserInviteInfo = async (projectCode, userCode) => {
  const inviteCode = await randomUtil.generateInviteCode()
  return userInviteInfoDao.create({
    projectCode: projectCode,
    userCode: userCode,
    inviteCode: inviteCode,
    inviteStatus: userInviteInfoConst.status.OPEN
  })
}

const validateInviteInfo = async inviteCode => {
  const userInviteInfo = await userInviteInfoDao.findByInviteCode(inviteCode)
  if(!userInviteInfo){
    throw errorUtil.makeError(systemCode.BIZ_INVITE_CODE_INVALID, `invalid invite code: ${inviteCode}`)
  }
  if(userInviteInfo.inviteStatus === userInviteInfoConst.status.CLOSE){
    throw errorUtil.makeError(systemCode.BIZ_INVITE_CODE_CLOSED, `closed invite code: ${inviteCode}`)
  }
  return userInviteInfo
}

const getUserInviteInfoByUserCode = async (projectCode, userCode) => {
  return userInviteInfoDao.findByUserCode(projectCode, userCode)
}

module.exports.createUserInviteInfo = createUserInviteInfo
module.exports.validateInviteInfo = validateInviteInfo
module.exports.getUserInviteInfoByUserCode = getUserInviteInfoByUserCode