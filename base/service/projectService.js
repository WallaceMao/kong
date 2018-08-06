const projectDao = require('../dao/projectDao')
const projectConst = require('../constant/project')

const getOpenProjectList = async () => {
  return projectDao.findAllByStatus(projectConst.status.OPEN)
}

const getProjectInfo = async projectCode => {
  return projectDao.findByProjectCode(projectCode)
}

module.exports.getProjectInfo = getProjectInfo
module.exports.getOpenProjectList = getOpenProjectList
