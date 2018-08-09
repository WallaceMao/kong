/**
 * 规则引擎，在项目启动时，读取所有的project以及对应的rewardRule
 */
const fs = require('fs')
const path = require('path')

const projectService = require('../service/projectService')

const ruleMap = {}
/**
 * 加载所有的rule
 */
const loadAllRules = () => {
  fs.readdirSync(path.join(__dirname, 'rules')).forEach(fileName => {
    ruleMap[fileName.split('.')[0]] = require('./rules/' + fileName)
  })
}
loadAllRules()

/**
 * 在项目启动时，读取数据库中所有的project，检查projectRule是否有效
 */
const checkProjectRewardConfig = async () => {
  // 查找系统中的所有project
  const projectList = await projectService.getOpenProjectList()
  // 遍历projectList，执行配置检查
  projectList.forEach(p => {
    if(!p.rewardRule){
      return
    }
    // 首先检查ruleMap中是否存在
    const rule = ruleMap[p.rewardRule]
    if(!rule){
      throw new Error(`reward engine start error: rewardRule not exist: ${rule}`)
    }
    // 然后调用rule的config方法进行检查
    rule.check(p.projectCode)
  })
}

/**
 * 获取projectCode这个project中，奖励规则的配置信息。
 * 必须要提供的配置信息包括：
 * （1）
 * @param projectCode
 * @returns {Promise<void>}
 */
const getRewardConfig = async (projectCode) => {
  // 根据projectCode从数据库读取project的rewardRuleConfig
  const project = await projectService.getProjectInfo(projectCode)

  // 加载RewardRule
  if(project.rewardRule){
    const rule = ruleMap[project.rewardRule]
    return rule['getConfig'](projectCode)
  }
}

/**
 * 执行奖励
 */
const executeReward = async (projectCode, triggeredUserCode, type, params) => {
  // 根据projectCode从数据库读取project的rewardRuleId
  const project = await projectService.getProjectInfo(projectCode)

  // 加载RewardRule
  if(project.rewardRule){
    const rule = ruleMap[project.rewardRule]
    if(rule[type]){
      await rule[type](projectCode, triggeredUserCode, params)
    }
  }
}

module.exports.checkProjectRewardConfig = checkProjectRewardConfig
module.exports.getRewardConfig = getRewardConfig
module.exports.executeReward = executeReward
