const constant = require('@const/constant')

const render = obj => {
  if(!obj){
    return null
  }
  return Array.isArray(obj) ? renderList(obj) : renderObject(obj)
}

const renderList = list => {
  return list.map(ele => {
    return renderObject(ele)
  })
}

const renderObject = obj => {
  return {
    name: obj.name,
    avatar: obj.avatar || constant.DEFAULT_AVATAR,
    registerRewardValue: obj.registerRewardValue,
    registerRewardValueUnit: obj.registerRewardUnit,
    registerRewardLimit: obj.registerRewardLimit,
    inviteRewardValue: obj.inviteRewardValue,
    inviteRewardValueUnit: obj.inviteRewardUnit,
    inviteRewardLimit: obj.inviteRewardLimit,
  }
}

module.exports.render = render
module.exports.renderList = renderList
module.exports.renderObject = renderObject
