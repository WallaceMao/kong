const projectDao = require('../dao/projectDao')

const getProjectInfo = async projectCode => {
  return projectDao.findByProjectCode(projectCode)
}

module.exports.getProjectInfo = getProjectInfo