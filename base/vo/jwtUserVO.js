const render = userInfo => {
  return {
    projectCode: userInfo.projectCode,
    userCode: userInfo.userCode
  }
}

module.exports.render = render
