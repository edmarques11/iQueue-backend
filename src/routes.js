const { Router } = require('express')

// Controllers
const companiesController = require('./controllers/CompaniesController')

const routes = Router()

// Companies Routes
routes.post('/companies', companiesController.save)

module.exports = { routes }
