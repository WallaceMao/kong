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
    // 然后调用rule的check方法进行检查
    rule.check(p.projectCode)
  })
}

/**
 * 执行奖励
 */
const executeReward = (projectCode, triggeredUserCode, type, params) => {
  // 根据projectCode从数据库读取project的rewardRuleId和rewardRuleConfig
  const project = projectService.getProjectInfo(projectCode)
  const projectRewardConfig = projectService.getRewardConfig(projectCode)

  // 加载RewardRule
  if(project.rewardRule){
    const rule = ruleMap[project.rewardRule]
    rule[type](projectRewardConfig, projectCode, triggeredUserCode, params)
  }
}

module.exports.checkProjectRewardConfig = checkProjectRewardConfig
module.exports.executeReward = executeReward
