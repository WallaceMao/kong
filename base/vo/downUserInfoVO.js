const userInfoVO = require('./userInfoVO')

const render = obj => {
  if(!obj){
    return null
  }
  return Array.isArray(obj) ? renderList(obj) : renderObject(obj)
}

const renderList = userRelationList => {
  return userRelationList.map(ele => {
    return renderObject(ele)
  })
}
/**
 * 做扁平化处理
 * @param userRelation
 * @returns {{id, projectCode, userCode, name, phoneNumber: *|UserInfo.phoneNumber|{type, field, allowNull}, avatar: *|UserInfo.avatar|{type, field, allowNull}, isSeedUser: *|UserInfo.isSeedUser|{type, field, allowNull, defaultValue}|boolean, status}}
 */
const renderObject = userRelation => {
  return userInfoVO.renderObject(userRelation.downUser)
}

module.exports.render = render
