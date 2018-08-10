const projectWeixinAppLinkDao = require('../dao/projectWeixinAppLinkDao')

const getActiveProjectWeixinApp = async projectCode => {
  return projectWeixinAppLinkDao.findProjectWeixinAppByIsActive(projectCode, true)
}

module.exports.getActiveProjectWeixinApp = getActiveProjectWeixinApp