const ProjectAdmin = require('../domain/ProjectAdmin')

const findByUsername = async (username) => {
  return await ProjectAdmin.findOne({
    attributes: ['id', 'projectCode', 'username', 'password'],
    where: {
      username: username
    }
  })
}

module.exports.findByUsername = findByUsername