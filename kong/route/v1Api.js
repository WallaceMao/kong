const express = require('express')
const router = express.Router()

const validateCodeService = require('@serv/validateCodeService')
const responseUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

/* GET users listing. */
router.post('/project/:projectCode/validateCode', async (req, res, next) => {
  try {
    const phoneNumber = req.body.phoneNumber
    if(!phoneNumber){
      return res.json(responseUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
    }
    await validateCodeService.handleValidateCode(phoneNumber)
    res.json(responseUtil.success())
  } catch (err) {
    next(err)
  }
});

router.post('/project/:projectCode/login', async (req, res, next) => {
  try {
    //  参数检查
    const phoneNumber = req.body.phoneNumber
    const validateCode = req.body.validateCode
    if(!phoneNumber || !validateCode){
      return res.json(responseUtil.renderResult(systemCode.BIZ_PARAMETER_ERROR))
    }
    //  验证验证码
    if(await validateCodeService.checkValidateCode(phoneNumber, validateCode)){
      return res.json(responseUtil.success())
    }else{
      return res.json(responseUtil.renderResult(systemCode.SYS_FORBIDDEN))
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router