const userRelationDao = require('../dao/userRelationDao')

const createUserRelation = async (projectCode, upUserCode, downUserCode) => {
  return userRelationDao.create({
    projectCode: projectCode,
    upUserCode: upUserCode,
    downUserCode: downUserCode
  })
}

module.exports.createUserRelation = createUserRelation