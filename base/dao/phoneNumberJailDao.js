const PhoneNumberJail = require('../domain/PhoneNumberJail')

const create = async props => {
  return PhoneNumberJail.create(props)
}

const findByPhoneNumber = async phoneNumber => {
  return PhoneNumberJail.findOne({
    where: {
      phoneNumber: phoneNumber
    }
  })
}

const deleteByPhoneNumber = async (phoneNumber, force) => {
  const obj = await findByPhoneNumber(phoneNumber)
  if(obj){
    obj.destroy({
      force: !!force
    })
  }
}

module.exports.create = create
module.exports.findByPhoneNumber = findByPhoneNumber
module.exports.deleteByPhoneNumber = deleteByPhoneNumber