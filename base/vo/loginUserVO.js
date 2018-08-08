const userInfoVO = require('./userInfoVO')

const render = loginUser => {
  const result = userInfoVO.renderObject(loginUser)
  if(loginUser.token){
    result.token = loginUser.token
  }
  return result
}
module.exports.render = render