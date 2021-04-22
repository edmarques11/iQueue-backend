const { Router } = require('express')
const usersController = require('../controllers/UsersController')

const routes = Router()

routes.post('/users', usersController.save)

module.exports = routes
