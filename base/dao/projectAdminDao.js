const ProjectAdmin = require('../domain/ProjectAdmin')

const findByUsername = async (username) => {
  return await ProjectAdmin.findOne({
    where: {
      username: username
    }
  })
}

const updateByUsername = async (username, props) =>{
  let obj = await findByUsername(username)
  if(obj){
    return obj.update(props)
  }
}

module.exports.findByUsername = findByUsername
module.exports.updateByUsername = updateByUsername