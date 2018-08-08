const path = require('path')
const express = require('express')

const init = app => {
  // view engine
  app.set('views', path.join(__dirname, '..', 'view'))
  app.set('view engine', 'ejs')
  // 静态资源
  app.use(express.static(path.join(__dirname, '..', 'public')))
}

module.exports.init = init