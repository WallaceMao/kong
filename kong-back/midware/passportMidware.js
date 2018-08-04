const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const createError = require('http-errors')

const userService = require('@serv/projectAdminService')

const init = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser(function(str, done) {
    done(null, JSON.parse(str))
  });

  passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await userService.checkPassword(username, password)
    if(user){
      return done(null ,user)
    }else{
      return done(createError(401))
    }
  }))
}

module.exports.init = init