const systemCode = require('../constant/systemCode')

const renderResult = (code, obj) => {
  if(code.toString() === systemCode.OK){
    // obj是Array和Object，走不同的渲染方法
    const result = {
      errcode: parseInt(code)
    }
    if(obj){
      result.result = obj
    }
    return result
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
