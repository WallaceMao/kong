const render = obj => {
  if(!obj){
    return null
  }
  return Array.isArray(obj) ? renderList(obj) : renderObject(obj)
}

const renderList = userAccountInfoList => {
  return userAccountInfoList.map(ele => {
    return renderObject(ele)
  })
}

const renderObject = userAccountInfo => {
  return {
    projectCode: userAccountInfo.projectCode,
    userCode: userAccountInfo.userCode,
    balanceValue: userAccountInfo.balanceValue,
    balanceValueUnit: userAccountInfo.balanceValueUnit,
    invitePackageSum: userAccountInfo.invitePackageSum,
    invitePackageClaimed: userAccountInfo.invitePackageClaimed
  }
}

module.exports.render = render
