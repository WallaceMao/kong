const mainRoute = require('./route/index')
const redirectRoute = require('./route/redirect')
const publicInterface = require('./publicInterface')

const install = async app => {
  //  安装路径
  app.use('/v1/project/:projectCode/weixin', mainRoute)
  app.use('/v1/weixinCallback', redirectRoute)

  //  安装回调访问
  return publicInterface
}
module.exports.install = install