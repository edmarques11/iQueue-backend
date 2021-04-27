const { Router } = require('express')
const usersRoutes = require('./users.routes')
const authRoutes = require('./authentication.routes')

const router = Router()

router.get('/', function (req, res) {
  res.status(200).send('<h1 style="text-align: center">App Online!</h1>')
})

router.use(usersRoutes)
router.use(authRoutes)

module.exports = router
