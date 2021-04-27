class UsersServices {
  constructor (User) {
    this.User = User
  }

  async create (firstName, lastName, email, password) {
    const dataUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password
    }

    try {
      return await this.User.create(dataUser)
    } catch (error) {
      console.error('at UsersServices', error)
      return error
    }
  }

  async getAuth (email) {
    try {
      const user = await this.User.findOne({
        where: { email }
      })
      return user
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = { UsersServices }
