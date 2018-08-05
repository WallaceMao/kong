const Project = require('../domain/Project')

/**
 * 根据id查找项目
 * @param id
 * @returns {*}
 */
const findById = async id =>{
  return Project.findById(id)
}
/**
 * 创建
 * @param props
 * @returns {Promise<props>}
 */
const create = async props =>{
  return Project.create(props)
}
/**
 * 根据ProjectCode更新项目
 * @param projectCode
 * @param props
 * @returns {Promise<void>}
 */
const updateByProjectCode = async (projectCode, props) =>{
  let obj = await findByProjectCode(projectCode)
  if(obj){
    return obj.update(props)
  }
}
/**
 * 根据projectCode删除
 * @param projectCode
 * @param force
 * @returns {Promise<void>}
 */
const deleteByProjectCode = async (projectCode, force) =>{
  let obj = await findByProjectCode(projectCode)
  if(obj){
    obj.destroy({
      force: !!force
    })
  }
}
/**
 * 根据projectCode查找项目
 * @param projectCode
 * @returns {Promise<*>}
 */
const findByProjectCode = async projectCode => {
  return Project.findOne({
    where: {
      projectCode: projectCode
    }
  })
}

module.exports.findById = findById
module.exports.create = create
module.exports.updateByProjectCode = updateByProjectCode
module.exports.deleteByProjectCode = deleteByProjectCode
module.exports.findByProjectCode = findByProjectCode
