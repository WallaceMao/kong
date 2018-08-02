const createError = require('http-errors');

const responseUtil = require('@util/httpUtil')
const systemCode = require('@const/systemCode')

const init = app => {
  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
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
    res.json(responseUtil.renderResult(systemCode.SYSTEM_ERROR));
    next()
  })
}

module.exports.init = init