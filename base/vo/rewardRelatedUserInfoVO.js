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
/**
 * 做扁平化处理
 * @param obj
 * @returns {{id, projectCode, userCode, name, phoneNumber: *|UserInfo.phoneNumber|{type, field, allowNull}, avatar: *|UserInfo.avatar|{type, field, allowNull}, isSeedUser: *|UserInfo.isSeedUser|{type, field, allowNull, defaultValue}|boolean, status}}
 */
const renderObject = obj => {
  const user = obj.relatedUser
  let rewardValue = Number(obj.rewardValue)
  if(isNaN(rewardValue)){
    rewardValue = 0
  }
  return {
    rewardValue: rewardValue,
    rewardValueUnit: obj.rewardValueUnit,
    rewardType: obj.rewardType,
    relatedUserName: user.name,
    relatedUserAvatar: user.avatar || constant.DEFAULT.AVATAR
  }
}

module.exports.render = render
