const models = require('../models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const host = '127.0.0.1:' + process.env.PORT

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = 'http://' + host + '/auth/google'

passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL,
    passReqToCallback: true
  },

  async (request, accessToken, refreshToken, profile, done) => {
    let user = await models.User.findOne({
      where: {
        email: profile.email,
      },
    })

    if(user) return await done(null, user)

    else {          
      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.email,
        password: profile.email,
        role: 'User',
        storeId: 1,
      }

      const createdUser = await models.User.create(newUser)

      return await done(null, createdUser)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (req, user, done) => {
  const desUser = await models.User.findOne({
    where: {
      email: user.email,
    },
  })
 
  if(desUser) done(null, desUser)
});