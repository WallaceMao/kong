const request = require('request')
const Promise = require('bluebird')

const recordService = require('@serv/userInviteCodeSendRecordService')
const userInviteInfoService = require('@serv/userInviteInfoService')
const userInfoService = require('@serv/userInfoService')
const platformConst = require('@const/platform')
const rewardEngine = require('@base/reward-engine')
const ossUtil = require('@util/ossUtil')
const constant = require('@const/constant')

const generateTelegramSenderId = async (jsonMessage) => {
  let sendIdArray = []
  if(jsonMessage.chat && jsonMessage.chat.id){
    sendIdArray.push(jsonMessage.chat.id)
  }
  if(jsonMessage.from && jsonMessage.from.id){
    sendIdArray.push(jsonMessage.from.id)
  }
  return sendIdArray.length === 0 ? null : sendIdArray.join('|')
}

const saveInviteCode = async (inviteCode, message) => {
  //  验证码为空
  if(!inviteCode){
    return 'ERROR: NO INVITE CODE FOUND!'
  }
  //  检查发送人是否已经超过限制
  const senderId = await generateTelegramSenderId(message)
  if(senderId){
    const senderRecords = await recordService.listRecordBySenderId(senderId)
    if(senderRecords.length >= constant.INVITE_CODE_LIMIT_PER_SENDER){
      return `ERROR: invite code [${inviteCode}]: your count reach max number limit`
    }
  }

  //  验证码是否已存在
  const record = await recordService.getRecordByInviteCode(inviteCode)
  if(record){
    return `WARN: invite code [${inviteCode}]: your code is already used!`
  }
  //  添加消息记录
  await recordService.createRecord(
    inviteCode,
    JSON.stringify(message),
    platformConst.inviteCodeSendSource.TELEGRAM,
    senderId)
  //  异步执行奖励用户的流程
  setTimeout(() => {
    Promise.all([
      rewardUser(inviteCode)
    ])
  }, 0)
  return `SUCCESS: invite code [${inviteCode}]: your code is received!`
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

const getMimeFromExtengName = (extendName) => {
  const lowerCase = extendName ? extendName.toLowerCase() : extendName
  switch (lowerCase){
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
    default:
      return 'image/png'
  }
}

const updateUserInfo = async (inviteCode, userInfo, proxyAgent) => {
  try {
    console.log('====user from telegram: ' + JSON.stringify(userInfo))
    const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)

    const propsToUpdate = {
      infoFrom: 'telegram'
    }

    if(userInfo.firstName || userInfo.lastName){
      const arr = []
      if(userInfo.firstName){
        arr.push(userInfo.firstName)
      }
      if(userInfo.lastName){
        arr.push(userInfo.lastName)
      }
      propsToUpdate.name = arr.join(' ')
    }

    const originalAvatar = userInfo.avatar
    if(originalAvatar){
      //  如果头像存在，那么就上传到阿里云
      const namePartArray = originalAvatar.split('.')
      const extendName = namePartArray[namePartArray.length - 1]

      // 将telegram中的头像上传到阿里云OSS
      const avatarUrl = `project/${userInviteInfo.projectCode}/user/${userInviteInfo.userCode}/avatar.${extendName}`
      console.log('====avatarUrl: ' + JSON.stringify(avatarUrl))
      await ossUtil.streamUpload(avatarUrl, request({
        url: originalAvatar,
        agent: proxyAgent
      }).on('response', (resp) => {
        resp.headers['content-type'] = getMimeFromExtengName(extendName)
      }))
      propsToUpdate.avatar = `${ossUtil.OSS_ROOT}/${avatarUrl}`
    }

    console.log('====begin to update local userInfo')
    // 更新userInfo中的name和头像
    return userInfoService.updateUserInfo(
      userInviteInfo.projectCode,
      userInviteInfo.userCode, propsToUpdate)
  } catch (err) {
    global.logger.error(err)
  }
}

module.exports.saveInviteCode = saveInviteCode
module.exports.rewardUser = rewardUser
module.exports.needUpdateUserInfo = needUpdateUserInfo
module.exports.updateUserInfo = updateUserInfo