const { renderError, makeError } = require('@util/errorUtil');

const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')


const init = app => {
  //  显式返回401无权限
  app.get('/401', async (req, res) => {
    return res.status(401).json(httpUtil.renderResult(systemCode.SYS_FORBIDDEN))
  })
  //  所有链接都不匹配的时候返回404
  app.use((req, res, next) => {
    next(makeError(systemCode.SYS_NOT_FOUND));
  });

// error handler
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