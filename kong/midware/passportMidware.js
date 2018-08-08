const passport = require('passport')
const jwtUtil = require('@util/jwtUtil')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtUtil.secret,
  issuer: jwtUtil.issuer,
  audience: jwtUtil.audience
}

const init = app => {
  app.use(passport.initialize())
  passport.use(new JwtStrategy(opts, (userInfo, done) => {
    //  验证jwt是否有权限
    return done(null ,userInfo)
  }))
}

module.exports.init = init