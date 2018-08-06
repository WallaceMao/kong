const ProjectRewardConfig = require('../domain/ProjectRewardConfig')

const findAllByProjectCode = async projectCode => {
  return ProjectRewardConfig.findAll({
    where: {
      projectCode: projectCode
    }
  })
}

module.exports.findAllByProjectCode = findAllByProjectCode