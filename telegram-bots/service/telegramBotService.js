const request = require('request')
const Promise = require('bluebird')

const recordService = require('@serv/userInviteCodeSendRecordService')
const userInviteInfoService = require('@serv/userInviteInfoService')
const userInfoService = require('@serv/userInfoService')
const platformConst = require('@const/platform')
const rewardEngine = require('@base/reward-engine')
const ossUtil = require('@util/ossUtil')

const saveInviteCode = async (inviteCode, message) => {
  //  验证码为空
  if(!inviteCode){
    return 'NO INVITE CODE FOUND!'
  }
  //  验证码是否已存在
  const record = await recordService.getRecordByInviteCode(inviteCode)
  if(record){
    return `invite code [${inviteCode}] is already used!`
  }
  //  添加消息记录
  await recordService.createRecord(inviteCode, JSON.stringify(message), platformConst.inviteCodeSendSource.TELEGRAM)
  //  异步执行奖励用户的流程
  setTimeout(() => {
    Promise.all([
      rewardUser(inviteCode)
    ])
  }, 0)
  return `invite code [${inviteCode}] received!`
}

const rewardUser = async (inviteCode) => {
  try {
    const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
    return Promise.all([
      rewardEngine.executeReward(userInviteInfo.projectCode, userInviteInfo.userCode, 'register'),
      rewardEngine.executeReward(userInviteInfo.projectCode, userInviteInfo.userCode, 'invite')
    ])
  } catch (err) {
    global.logger.error(err)
  }
}

const needUpdateUserInfo = async (inviteCode) => {
  const userInviteInfo = await userInviteInfoService.getUserInviteInfoByInviteCode(inviteCode)
  return userInviteInfo && !userInviteInfo.userInfo.infoFrom
}

const updateUserInfo = async (inviteCode, userInfo, proxyAgent) => {
  try {
    const originalAvatar = userInfo.avatar
    console.log('====imageUrl: ' + originalAvatar)
    const namePartArray = originalAvatar.split('.')
    const extendName = namePartArray[namePartArray.length - 1]

    // 将telegram中的头像上传到阿里云OSS
    const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
    const avatarUrl = `project/${userInviteInfo.projectCode}/user/${userInviteInfo.userCode}/avatar.${extendName}`
    console.log('====avatarUrl: ' + JSON.stringify(avatarUrl))
    await ossUtil.streamUpload(avatarUrl, request({
      url: originalAvatar,
      agent: proxyAgent
    }))

    console.log('====begin to update local userInfo')
    // 更新userInfo中的name和头像
    return userInfoService.updateUserInfo(
      userInviteInfo.projectCode,
      userInviteInfo.userCode, {
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      avatar: `${ossUtil.OSS_ROOT}/${avatarUrl}`
    })
  } catch (err) {
    global.logger.error(err)
  }
}

module.exports.saveInviteCode = saveInviteCode
module.exports.rewardUser = rewardUser
module.exports.needUpdateUserInfo = needUpdateUserInfo
module.exports.updateUserInfo = updateUserInfo