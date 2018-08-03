const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy

const init = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
  });

  passport.deserializeUser(function(str, done) {
    done(null, JSON.parse(str))
  });

  passport.use(new LocalStrategy((username, password, done) => {
    return done(null ,{username: username})
  }))
}

module.exports.init = init