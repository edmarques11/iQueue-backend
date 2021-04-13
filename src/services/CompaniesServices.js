class CompaniesServices {
  constructor (Companie) {
    this.Companie = Companie
  }

  async create (cnpj, name, description) {
    const dataCompanie = { cnpj, name, description }

    try {
      const companie = await this.Companie.create(dataCompanie)
      return companie
    } catch (error) {
      console.error('at CompaniesController', error)
      return error
    }
  }
}

module.exports = { CompaniesServices }
