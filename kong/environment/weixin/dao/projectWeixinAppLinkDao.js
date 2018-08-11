const Project = require('@base/domain/Project')
const ProjectWeixinAppLink = require('../domain/ProjectWeixinAppLink')
const WeixinApp = require('../domain/WeixinApp')

const findById = async id => {
  return ProjectWeixinAppLink.findById(id)
}

const findProjectWeixinAppByIsActive = async (projectCode, isActive) => {
  return ProjectWeixinAppLink.findOne({
    where: {
      projectCode: projectCode,
      isActive: !!isActive
    },
    include: [{
      required: true,
      model: WeixinApp,
      as: 'weixinApp'
    },{
      required: true,
      model: Project,
      as: 'project'
    }]
  })
}

module.exports.findById = findById
module.exports.findProjectWeixinAppByIsActive = findProjectWeixinAppByIsActive