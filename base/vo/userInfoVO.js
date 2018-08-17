const constant = require('@const/constant')

const render = obj => {
  if(!obj){
    return null
  }
  return Array.isArray(obj) ? renderList(obj) : renderObject(obj)
}

const renderList = userInfoList => {
  return userInfoList.map(ele => {
    return renderObject(ele)
  })
}

const renderObject = userInfo => {
  const result = {
    projectCode: userInfo.projectCode,
    userCode: userInfo.userCode,
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber,
    avatar: userInfo.avatar || constant.DEFAULT_AVATAR,
    isSeedUser: userInfo.isSeedUser,
    status: userInfo.status
  }
  if(userInfo.inviteCode){
    result.inviteCode = userInfo.inviteCode
  }
  return result
}

module.exports.render = render
module.exports.renderList = renderList
module.exports.renderObject = renderObject
