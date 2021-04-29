const { Router } = require('express')
const authenticationController = require('../controllers/authenticationController')

const routes = Router()

routes.post('/users/login', authenticationController.login)

module.exports = routes
