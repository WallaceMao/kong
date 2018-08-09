const systemCode = require('../constant/systemCode')

const makeError = (code, msg) => {
  msg = msg || systemCode.messageMap[code]
  const err = new Error()
  err.code = code
  err.message = msg
  return err
}

module.exports.makeError = makeError