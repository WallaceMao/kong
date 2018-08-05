const passport = require('passport')
const jwtUtil = require('@util/jwtUtil')

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

const cookieExtractor = req => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[jwtUtil.cookieName]
  }
  return token
}

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
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