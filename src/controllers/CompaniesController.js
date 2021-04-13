const { Companies } = require('../models')
const { CompaniesServices } = require('../services')
const yup = require('yup')

const companiesServices = new CompaniesServices(Companies)

module.exports = {
  async save (request, response) {
    const { cnpj, name, description } = request.body

    const schema = yup.object().shape({
      cnpj: yup.string().required(),
      name: yup.string().required(),
      description: yup.string().required()
    })

    try {
      schema.validate(request.body, { abortEarly: false })
    } catch (error) {
      console.error(error)
      response.status(400).json(error)
    }

    const companie = await companiesServices.create(cnpj, name, description)

    if (companie.error) {
      return response.status(400).json(companie.error)
    } else {
      response.status(201).json(companie)
    }
  }
}
