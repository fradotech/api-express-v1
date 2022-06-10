const express = require('express');

const router = express.Router()
const controllers = require('../controllers');
const { authMiddleware } = require('../middlewares/auth');

router.get('/', [authMiddleware], controllers.meController.me)
router.put('/', [authMiddleware], controllers.meController.update)

module.exports = {
  baseUrl: '/me',
  router,
}
