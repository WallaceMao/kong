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
  return {
    id: userInfo.id,
    projectCode: userInfo.projectCode,
    userCode: userInfo.userCode,
    name: userInfo.name,
    phoneNumber: userInfo.phoneNumber,
    avatar: userInfo.avatar,
    isSeedUser: userInfo.isSeedUser,
    status: userInfo.status
  }
}

module.exports.render = render
