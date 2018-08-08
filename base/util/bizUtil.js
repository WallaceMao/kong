const generateName = params => {
  if(params.phoneNumber && params.phoneNumber.length > 10){
    return `${params.phoneNumber.substr(0, 3)}*****${params.phoneNumber.substr(8)}`
  }
}

module.exports.generateName = generateName