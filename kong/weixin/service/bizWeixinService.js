const systemCode = require('@const/systemCode')
const { makeError } = require('@util/errorUtil')
const projectWeixinAppService = require('./projectWeixinAppService')
const util = require('../util')

const getAuthUrl= async projectCode => {
  const link = await projectWeixinAppService.getActiveProjectWeixinApp(projectCode)
  if(!link || !link.weixinApp){
    throw makeError(systemCode.BIZ_THIRD_PARTY_INVALID)
  }
  return util.getAuthPageUrl(projectCode, link.weixinApp)
}

module.exports.getAuthUrl = getAuthUrl