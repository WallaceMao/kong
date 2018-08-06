const express = require('express');
const morgan = require('morgan');

const viewMidware = require('./midware/viewMidware')
const requestParserMidware = require('./midware/requestParserMidware')
const passportMidware = require('./midware/passportMidware')
const routerMidware = require('./midware/routerMidware')
const errorHandler = require('./midware/errorHandler')
const rewardEngine = require('@base/reward-engine')

const app = express()

//  生产环境下是否需要记录？
app.use(morgan('dev'))

//  初始化view层的处理
viewMidware.init(app)

//  初始化解析请求
requestParserMidware.init(app)

//  初始化权限验证配置
passportMidware.init(app)

//  初始化路由规则
routerMidware.init(app)

//  初始化错误处理
errorHandler.init(app)

//  load reward engine
rewardEngine.checkProjectRewardConfig()

module.exports = app;
