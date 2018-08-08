const express = require('express')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const config = require('config')

const secret = config.auth.session.secret

const init = app => {
  // json格式解析
  app.use(express.json())
  // x-www-form-urlencoded格式解析
  app.use(express.urlencoded({ extended: false }))
  // cookie解析
  app.use(cookieParser())
  // 处理session
  app.use(expressSession({ secret: secret, resave: true, saveUninitialized: true }))
}

module.exports.init = init