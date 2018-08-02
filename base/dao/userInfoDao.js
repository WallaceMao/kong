const User = require('../domain/UserInfo')

function findById(id){
  return User.findById(id)
}

function saveOrUpdate(){}

function remove(){}

module.exports.findById = findById
module.exports.saveOrUpdate = saveOrUpdate
module.exports.remove = remove