const { Users } = require('../models')
const { UsersServices } = require('../services')
const yup = require('yup')
const { AuthServices } = require('../services')

const authServices = new AuthServices(Users)

const userssServices = new UsersServices(Users)

module.exports = {
  async save (request, response) {
    const { firstName, lastName, email, password } = request.body

    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/)
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
      return response.status(400).json(error.message)
    }

    const dataUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    try {
      const user = await userssServices.create(dataUser.first_name, dataUser.last_name, dataUser.email, dataUser.password)
      user.password = undefined
      return response.status(201).send({ user, token: authServices.generateToken(user.id) })
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
