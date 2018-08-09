const { makeError } = require('@util/errorUtil')
const systemCode = require('@const/systemCode')

const projectService = require('@serv/projectService')

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
 *
 * @param req
 */
const checkProjectCode = req => {
  if(req.params.projectCode !== req.user.projectCode){
    throw makeError(systemCode.BIZ_PARAMETER_ERROR)
  }
  return req.user.projectCode
}

module.exports.checkParameter = checkParameter
module.exports.checkProjectCode = checkProjectCode