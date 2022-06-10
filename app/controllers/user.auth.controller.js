const models = require('../models');
const response = require('../functions/serviceUtil.js');
const auth = require('../middlewares/auth.js');
const passport = require('passport')

module.exports = {
  name: 'authController',
  
  oauth: passport.authenticate('google', { scope: ['email', 'profile'] }),
  guard: passport.authenticate('google', { 
    successRedirect: '/auth/login',
    failureRedirect: '/auth/unauthorized' 
  }),
  unauthorized: async (req, res, next) => {
    res.status(403).send(response.getResponseCustom(403, 'Unauthorized'))
  },

  login: async (req, res, next) => {
    const user = req.user
    const accessToken = auth.generateAccessToken({
      id: user.id,
      name: user.name,
      email: user.email,
    })

    req.session.destroy()

    res.status(200).send(response.getResponseCustom(200, {
      accessToken,
      user
    }))

  },

  emailVerify: async (req, res, next) => {
    const user = await models.User.findByPk(req.user.id)

    user.token = req.headers.authorization.slice(7)
    await user.save()

    // Send email
    res.status(200).send(response.getResponseCustom(200, 'Email verification was send'))
  },

  verify: async (req, res, next) => {
    const user = await models.User.findOne({
      where: {
        token: req.params.token,
      },
    })

    if(!user) return res.status(401).send(response.getErrorResponseCustom(401, 'Token is invalid'))
    
    user.verify = true
    user.token = 'verify'
    const verifiedUser = await user.save()

    res.status(200).send(response.getResponseCustom(200, verifiedUser))
  },
}