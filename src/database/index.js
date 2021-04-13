const Sequelize = require('sequelize')
const dbConfig = require('../config/database')

// Models
const { Companies } = require('../models')

const connection = new Sequelize(dbConfig)

// Connections Models
Companies.init(connection)

module.exports = connection
