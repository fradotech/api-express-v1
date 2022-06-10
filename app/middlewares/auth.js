const jwt = require('jsonwebtoken');
const response = require('../functions/serviceUtil.js');

const googleGuard = async (req, res, next) => {
  if(!req.user) return res.status(403).send(response.getErrorResponseCustom(403, 'Unauthorized! Login with google in route {{host}}/auth'))
  next()
}

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization

    if (!token) res.status(403).send(response.getErrorResponseCustom(403, 'Unauthorized! Token was not found')).res.end()

    if (token.slice(0, 7) !== 'Bearer ') res.status(401).send(response.getErrorResponseCustom(401, 'Unauthorized! Token is invalid')).res.end()
    token = token.slice(7)

    await jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) res.status(401).send(response.getErrorResponseCustom(401, 'Unauthorized! Token is expired')).res.end()

      req.user = user
      next()
    })
  } catch (err) {
    next(err)
  }
}

const generateAccessToken = (user) =>
  // expires after one week (604800 seconds = 1 week)
  jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '604800s' })

module.exports = {
  googleGuard,
  authMiddleware,
  generateAccessToken,
}
