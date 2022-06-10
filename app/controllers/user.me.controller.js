const models = require('../models');
const response = require('../functions/serviceUtil.js');
const CustomError = require('../functions/CustomError');
const client = require('../config/redis.config')

module.exports = {
  name: 'meController',

  me: async (req, res, next) => {
    try {
      let me = await client.get(`me[${req.user.id}]`)

      if (!me) {
        me = await models.User.findByPk(req.user.id)

        await client.set(`me[${req.user.id}]`, JSON.stringify(me))

        res.status(200).send(response.getResponseCustom(200, me))
        res.end()
      }

      res.status(200).send(response.getResponseCustom(200, JSON.parse(me)))
      res.end()
      
    } catch (error) {
      next(error)
    }
  },

  update: async (req, res, next) => {
    try {
      await client.del(`me[${req.user.id}]`)

      const result = await models.sequelize.transaction(async (transaction) => {
        const me = await models.User.findByPk(req.user.id, { transaction })

        if (!req.body.password) throw new CustomError('You have to send your Actual Password', 412)
        if (!me.checkPassword(req.body.password)) throw new CustomError('The password is incorrect', 412)
        if (req.body.newPassword && req.body.newPassword.length < 6) throw new CustomError('New Password must have at least 6 characters')
        if (req.body.newPassword !== req.body.newPasswordConfirmation) throw new CustomError('The New Passwords are not the same', 412)

        if (req.body.name) me.name = req.body.name
        if (req.body.phone) me.phone = req.body.phone
        if (req.body.address) me.address = req.body.address
        if (req.body.avatar) me.avatar = req.body.avatar
        if (req.body.storeId) me.storeId = req.body.storeId
        if (req.body.newPassword) me.password = req.body.newPassword
        
        await me.save({ transaction })

        return me
      })

      res.status(200).send(response.getResponseCustom(200, result))
      res.end()
      
    } catch (error) {
      next(error)
    }
  },
}