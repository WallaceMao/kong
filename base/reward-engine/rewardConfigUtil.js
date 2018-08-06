const projectRewardConfigDao = require('../dao/projectRewardConfigDao')
/**
 * 从数据库读取ProjectRewardConfig
 * @param projectCode
 * @returns {Promise<{}>}
 */
const getRewardConfig = async projectCode => {
  const configList = await projectRewardConfigDao.findAllByProjectCode(projectCode)
  const result = {}
  configList.forEach(entry => {
    result[entry.configKey] = entry.configValue
  })
  return result
}

module.exports.getRewardConfig = getRewardConfig