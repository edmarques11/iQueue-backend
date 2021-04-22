const { Users } = require('../models')
const { UsersServices } = require('../services')
const yup = require('yup')

const userssServices = new UsersServices(Users)

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
      response.status(400).json(error)
    }

    const dataUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    const user = await userssServices.create(dataUser.first_name, dataUser.last_name, dataUser.email, dataUser.password)

    if (user.error) {
      return response.status(400).json(user.error)
    } else {
      return response.status(201).json(user)
    }
  }
}
