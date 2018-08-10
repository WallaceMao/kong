const ProjectWeixinUserLink = require('../domain/UserWeixinLink')

const findById = async id => {
  return ProjectWeixinUserLink.findById(id)
}

module.exports.findById = findById