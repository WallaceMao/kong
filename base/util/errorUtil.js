const systemCode = require('../constant/systemCode')

class BizError extends Error {
  constructor(code, message, extra) {
    super(message)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    this.code = code
    this.extra = extra
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor)
  }
}

const makeError = (code, msg) => {
  code = code || '-1'
  msg = msg || systemCode.messageMap[code]
  return new BizError(code, msg)
}

const renderError = err => {
  let errcode = err.code
  if(!(err instanceof BizError)){
    errcode = systemCode.SYS_ERROR
  }
  let status
  switch (errcode) {
    case '-1':
      status = 500
      break
    case '10401':
      status = 401
      break
    case '10404':
      status = 404
      break
    default:
      status = 200
      break
  }
  return {
    status: status,
    errcode: errcode
  }
}
module.exports.makeError = makeError
module.exports.renderError = renderError
module.exports.BizError = BizError