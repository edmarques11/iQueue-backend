const { Router } = require('express')

// Controllers
const usersController = require('./controllers/UsersController')

const routes = Router()

// Companies Routes
routes.post('/users', usersController.save)

module.exports = { routes }
