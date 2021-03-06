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
}

module.exports = { UsersServices }
