const systemCode = require('../constant/systemCode')

const renderResult = (code, obj) => {
  if(code === systemCode.OK){
    obj = obj || {}
    obj.errcode = parseInt(code)
    return obj
  }else{
    return {
      errcode: parseInt(code),
      errmsg: systemCode.messageMap[code]
    }
  }
}

const success = (obj) => {
  return renderResult(systemCode.OK, obj)
}
module.exports.renderResult = renderResult
module.exports.success = success
