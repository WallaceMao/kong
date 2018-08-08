const rewardEngine = require('@base/reward-engine')

const check = () => {
  //  检查redis是否正常
  //  load reward engine
  rewardEngine.checkProjectRewardConfig()
}

module.exports.check = check