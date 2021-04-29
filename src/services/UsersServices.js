const bcrypt = require('bcrypt')
const SALT = 8

class UsersServices {
  constructor (User) {
    this.User = User
  }

  async create (firstName, lastName, email, password) {
    const dataUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: bcrypt.hashSync(password, SALT)
    }

    try {
      return await this.User.create(dataUser)
    } catch (error) {
      console.error('at UsersServices', error)
      throw new Error(error)
    }
  }
}

module.exports = { UsersServices }
