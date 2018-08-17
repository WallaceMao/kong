const phoneNumberJailDao = require('../dao/phoneNumberJailDao')

const add = async (num) => {
  return phoneNumberJailDao.create({
    phoneNumber: num
  })
}
const del = async (num) => {
  return phoneNumberJailDao.deleteByPhoneNumber(num)
}
const isIn = async (num) => {
  return phoneNumberJailDao.findByPhoneNumber(num)
}

module.exports.add = add
module.exports.del = del
module.exports.isIn = isIn