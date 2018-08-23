const constant = require('../constant/constant')

const render = project => {
  return {
    projectCode: project.projectCode,
    projectName: project.projectName,
    projectHeaderNote: project.projectHeaderNote,
    projectNote: project.projectNote,
    projectLogoUrl: project.projectLogoUrl,
    projectTextLogoUrl: project.projectTextLogoUrl,
    telegramJoinLink: project.telegramJoinLink,
    platformLink: project.platformLink,
    teleGroupName: project.teleGroupName || constant.DEFAULT.TELE_GROUP_NAME,
    shareTitle: project.shareTitle || constant.DEFAULT.SHARE_TITLE,
    shareDesc: project.shareDesc || constant.DEFAULT.SHARE_DESC,
    shareImageLink: project.shareImageLink || constant.DEFAULT.SHARE_IMAGE_URL,
    shareLink: project.shareLink
  }
}

module.exports.render = render