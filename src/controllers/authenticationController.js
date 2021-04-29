const { Users } = require('../models')
const { AuthServices } = require('../services/AuthServices')

const authServices = new AuthServices(Users)
module.exports = {
  async login (request, response) {
    try {
      const { email, password } = request.body
      const { token, userData } = await authServices.login(email, password)
      response.status(201).json({ auth: true, user: userData, token: token })
    } catch (err) {
      response.status(401).send({ auth: false, token: null, message: err.message })
    }
  }
}
