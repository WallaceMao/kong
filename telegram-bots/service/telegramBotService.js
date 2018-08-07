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

const updateUserInfo = async (inviteCode, telegram, message) => {
  try {
    // 获取telegram中的用户头像
    const msgUser = message.from
    const photosArray = await telegram.getUserProfilePhotos(msgUser.id, 0, 1)
    const file = await telegram.getFile(photosArray.photos[0][0].file_id)
    const imageUrl = `${TELEGRAM_AVATAR_PREFIX}${config.telegram.token}${file.file_path}`
    const extendName = file.file_path.split('.')[-1]

    // 将telegram中的头像上传到阿里云OSS
    const userInviteInfo = await userInviteInfoService.validateInviteInfo(inviteCode)
    console.log('====file: ' + JSON.stringify(file))
    const avatarUrl = `profile/${userInviteInfo.projectCode}/${userInviteInfo.userCode}/avatar.${extendName}`
    await ossUtil.streamUpload(avatarUrl, request(imageUrl))

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