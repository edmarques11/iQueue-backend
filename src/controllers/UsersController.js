const { Users } = require('../models')
const { UsersServices } = require('../services')
const authConfig = require('../config/auth.json')
const jwt = require('jsonwebtoken')
const yup = require('yup')

const userssServices = new UsersServices(Users)

function generateToken (params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: '1h'
  })
}

module.exports = {
  async save (request, response) {
    const { firstName, lastName, email, password } = request.body

    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    try {
      schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
      response.status(400).json(error.message)
    }

    const dataUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    try {
      const user = await userssServices.create(dataUser.first_name, dataUser.last_name, dataUser.email, dataUser.password)
      return response.status(201).send({ user, token: generateToken({ id: user.id }) })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
