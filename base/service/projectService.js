const projectDao = require('../dao/projectDao')
const projectRewardConfigDao = require('../dao/projectRewardConfigDao')
const projectConst = require('../constant/project')

const getOpenProjectList = async () => {
  return projectDao.findAllByStatus(projectConst.status.OPEN)
}

const getProjectInfo = async projectCode => {
  return projectDao.findByProjectCode(projectCode)
}

const getRewardConfig = async projectCode => {
  const configList = await projectRewardConfigDao.findAllByProjectCode(projectCode)
  const result = {}
  configList.forEach(entry => {
    result[entry.configKey] = entry.configValue
  })
  return result
}

module.exports.getProjectInfo = getProjectInfo
module.exports.getOpenProjectList = getOpenProjectList
module.exports.getRewardConfig = getRewardConfig