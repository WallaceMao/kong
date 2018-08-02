const Project = require('../domain/Project')

const findById = id =>{
  return Project.findById(id)
}

const findAll = () =>{
  return Project.findAll()
}

const create = props =>{
  return Project.create(props)
}

const update = async (id, props) =>{
  let obj = await findById(id)
  if(obj){
    return obj.update(props)
  }
}

const deleteById = async (id, force) =>{
  let obj = await findById(id)
  if(obj){
    obj.destroy({
      force: !!force
    })
  }
}

module.exports.findById = findById
module.exports.findAll = findAll
module.exports.create = create
module.exports.update = update
module.exports.deleteById = deleteById