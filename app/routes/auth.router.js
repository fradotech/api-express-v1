const express = require('express');

const router = express.Router()
const controllers = require('../controllers');
const { googleGuard, authMiddleware } = require('../middlewares/auth');

router.get('/', controllers.authController.oauth)
router.get('/google', controllers.authController.guard)
router.get('/unauthorized', [], controllers.authController.unauthorized)
router.get('/login', [googleGuard], controllers.authController.login)
router.patch('/', [authMiddleware], controllers.authController.emailVerify)
router.put('/:token', [authMiddleware], controllers.authController.verify)

module.exports = {
  baseUrl: '/auth',
  router,
}
