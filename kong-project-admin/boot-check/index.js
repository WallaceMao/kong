const rewardEngine = require('@base/reward-engine')

const check = () => {
//  load reward engine
  rewardEngine.checkProjectRewardConfig()
}

module.exports.check = check