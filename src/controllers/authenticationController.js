const { Users } = require('../models')
const { UsersServices } = require('../services')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

const userssServices = new UsersServices(Users)

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  })
}

module.exports = {
  async auth (request, response) {
    const { email, password } = request.body

    let user
    try {
      user = await userssServices.getAuth(email)
    } catch (error) {
      return response.status(400).json({ message: error.message })
    }

    if (!user) {
      return response.status(400).json({ message: 'Invalid email!' })
    }

    if (password !== await user.password) {
      return response.status(400).json({ message: 'Invalid password!' })
    }

    user.password = undefined

    return response.status(200).send({
      user,
      token: generateToken({ id: user.id })
    })
  }
}
