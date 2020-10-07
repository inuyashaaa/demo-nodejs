const router = require('express').Router()
const knex = require('../databases')
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body
  if (!username || !password || !email) {
    return res.status(400).json({
      success: false,
      error: "Username, password, email is required"
    })
  }
  const salt = bcrypt.genSaltSync(10)
  const encryptedPassword = bcrypt.hashSync(password, salt)
  const user = await knex('users').insert({
    email,
    username,
    password: encryptedPassword
  })

  res.json({
    success: true,
    data: {
      id: user[0]
    }
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      error: "Username or password is required"
    })
  }

  const user = await knex('users').where('username', username)
  if (!user) {
    return res.status(400).json({
      success: false,
      error: "Username is not found"
    })
  }
  const isValidPassword = bcrypt.compareSync(password, user[0].password)
  if (!isValidPassword) {
    return res.status(400).json({
      success: false,
      error: "Password invalid"
    })
  }

  res.json({
    success: true,
    data: user[0]
  })
})

module.exports = router
