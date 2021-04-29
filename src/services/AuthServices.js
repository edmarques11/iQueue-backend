const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

class AuthServices {
  constructor (user) {
    this.user = user
  }

  generateToken (user) {
    const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: '1h' })
    return token
  }

  async login (email, password) {
    const user = await this.user.findOne({
      where: {
        email: email
      }
    })

    if (user === null) {
      throw new Error('Invalid Email or Password!')
    }

    const passwordIsValid = password === user.password
    if (!passwordIsValid) {
      throw new Error('Invalid Email or Password!')
    }
    const token = this.generateToken(user.id)
    const { name } = user
    return { token, userData: { name, email } }
  }
}

module.exports = { AuthServices }
