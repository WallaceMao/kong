const config = require('config')
const request = require('request')
const Promise = require('bluebird')

const recordService = require('@serv/userInviteCodeSendRecordService')
const userInviteInfoService = require('@serv/userInviteInfoService')
const userInfoService = require('@serv/userInfoService')
const platformConst = require('@const/platform')
const rewardEngine = require('@base/reward-engine')
const ossUtil = require('@util/ossUtil')

const TELEGRAM_AVATAR_PREFIX = 'https://api.telegram.org/file/bot'

const checkRecordExist = async inviteCode => {
  const record = await recordService.getRecordByInviteCode(inviteCode)
  return !!record
}
const saveRecord = async (inviteCode, message) => {
  return recordService.createRecord(inviteCode, JSON.stringify(message), platformConst.inviteCodeSendSource.TELEGRAM)
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

const updateUserInfo = async (inviteCode, telegram, message, agent) => {
  try {
    // 获取telegram中的用户头像
    console.log('====message: ' + JSON.stringify(message))
    const msgUser = message.from
    console.log('====msgUser: ' + JSON.stringify(msgUser))
    const photoObject = await telegram.getUserProfilePhotos(msgUser.id, 0, 1)
    console.log('====photoObject: ' + JSON.stringify(photoObject))
    if(!photoObject['total_count'] || photoObject['total_count'] < 1){
      return
    }
    const file = await telegram.getFile(photoObject.photos[0][0].file_id)
    const imageUrl = `${TELEGRAM_AVATAR_PREFIX}${config.telegram.token}${file.file_path}`
    const namePartArray = file.file_path.split('.')
    const extendName = namePartArray[namePartArray.length - 1]
    console.log('====imageUrl: ' + imageUrl)

    // 将telegram中的头像上传到阿里云OSS
    const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
    console.log('====file: ' + JSON.stringify(file))
    const avatarUrl = `profile/${userInviteInfo.projectCode}/${userInviteInfo.userCode}/avatar.${extendName}`
    console.log('====avatarUrl: ' + JSON.stringify(avatarUrl))
    // return
    await ossUtil.streamUpload(avatarUrl, request({
      url: imageUrl,
      agent: agent
    }))

    // 更新userInfo中的name和头像
    return userInfoService.updateUserInfo({
      name: `${msgUser.first_name} ${msgUser.last_name}`,
      avatar: `${ossUtil.OSS_ROOT}/${avatarUrl}`
    })
  } catch (err) {
    global.logger.error(err)
  }
}

module.exports.checkRecordExist = checkRecordExist
module.exports.saveRecord = saveRecord
module.exports.rewardUser = rewardUser
module.exports.updateUserInfo = updateUserInfo