const userInfoVO = require('./userInfoVO')

const render = loginUser => {
  const result = userInfoVO.renderObject(loginUser)
  if(loginUser.token){
    result.token = loginUser.token
  }
  if(loginUser.inviteCode){
    result.inviteCode = loginUser.inviteCode
  }
  return result
}
module.exports.render = render