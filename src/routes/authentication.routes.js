const { Router } = require('express')
const authenticationController = require('../controllers/authenticationController')

const routes = Router()

routes.post('/auth', authenticationController.auth)

module.exports = routes
