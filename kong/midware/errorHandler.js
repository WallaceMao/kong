const { renderError, makeError } = require('@util/errorUtil');

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

const init = app => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(makeError(systemCode.SYS_NOT_FOUND));
  });

  /**
   * 错误的处理流程：
   * 1. 判断错误的类型，如果不是BizError，那么状态码直接为500，err.code为-1.
   * 1. 根据err.code进行判断状态码
   * （1）'-1'对应500
   * （2）'10401'对应401
   * （3）'10404'对应404
   * （4）其他对应200
   * 2  返回值的errcode为code
   * 3  只针对状态码500的错误，打印日志
   */
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    const { status, errcode } = renderError(err)

    if(status === 500){
      global.logger.error('system error url: %s, body: %s, err: %s', req.url, JSON.stringify(req.body), err)
    }
    res.status(status);
    res.json(httpUtil.renderResult(errcode));
    next()
  })
}

module.exports.init = init