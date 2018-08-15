const express = require('express')
const cookieParser = require('cookie-parser')

const init = app => {
  // json格式解析
  app.use(express.json())
  // x-www-form-urlencoded格式解析
  app.use(express.urlencoded({ extended: false }))
  // cookie解析
  app.use(cookieParser())
}

module.exports.init = init