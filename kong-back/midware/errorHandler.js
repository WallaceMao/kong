const httpUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

const init = app => {
  //  显式返回401无权限
  app.get('/401', async (req, res) => {
    return res.status(401).json(httpUtil.renderResult(systemCode.SYS_FORBIDDEN))
  })
  //  所有链接都不匹配的时候返回404
  app.use((req, res, next) => {
    // next(createError(404));
    res.status(404).json(httpUtil.renderResult(systemCode.SYS_NOT_FOUND))
    next()
  });

// error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get('env') === 'development' ? err : {};

    // next(err)
    // render the error page
    global.logger.error('system error: %s', err)
    res.status(err.status || 500);
    res.json(responseUtil.renderResult(systemCode.SYS_ERROR));
    next()
  })
}

module.exports.init = init