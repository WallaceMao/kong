const { makeError } = require('@util/errorUtil')
const systemCode = require('@const/systemCode')

const projectService = require('@serv/projectService')
const bizUtil = require('@util/bizUtil')

const checkParameter = (req, parameterList) => {
  const result = {}
  parameterList.forEach(p => {
    if(req.param[p]){
      result[p] = req.param[p]
      return
    }
    if(req.query[p]){
      result[p] = req.query[p]
      return
    }
    if(req.body[p]){
      result[p] = req.body[p]
      return
    }
    throw makeError(systemCode.BIZ_PARAMETER_ERROR)
  })
  return result
}

/**
 * 对于已登录用户，使用这个校验器校验
 * @param req
 */
const checkProjectCode = req => {
  if(req.params.projectCode !== req.user.projectCode){
    throw makeError(systemCode.BIZ_PARAMETER_ERROR)
  }
  return req.user.projectCode
}
/**
 * 对于未登录用户，使用这个校验器
 * @param req
 */
const checkProjectValid = req => {
  const projectCode = req.params.projectCode
  if(!projectCode){
    throw makeError(systemCode.SYS_FORBIDDEN)
  }
  const project = projectService.getProjectInfo(projectCode)
  if(!project){
    throw makeError(systemCode.SYS_FORBIDDEN)
  }
  return projectCode
}

const checkPhoneNumber = phoneNumber => {
  if(!bizUtil.checkPhoneNumber(phoneNumber)){
    throw makeError(systemCode.BIZ_PARAMETER_ERROR)
  }
}

module.exports.checkParameter = checkParameter
module.exports.checkProjectCode = checkProjectCode
module.exports.checkProjectValid = checkProjectValid
module.exports.checkPhoneNumber = checkPhoneNumber