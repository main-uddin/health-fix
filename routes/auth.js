const env = require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const route = Router()

const { debugOnly } = require('../utils/')
const { levelDB } = require('../utils/db')

const userdb = levelDB('users')

if (env.error) throw env.error

route.put('/', async (req, res) => {
  try {
    const { userName, email, password } = req.body
    const hash = await bcrypt.hash(password, 9)
    const reply = await userdb.put(userName, {
      userName,
      email,
      password: hash
    })
    res.json({
      ok: true,
      message: 'Data sucessfully inserted!',
      reply: debugOnly(reply)
    })
  } catch (error) {
    res.json({ ok: false, error: debugOnly(error) })
  }
})
route.post('/', async (req, res) => {
  try {
    const { userName, password } = req.body
    const user = await userdb.get(userName)
    const pwdIsCorrect = await bcrypt.compare(password, user.password)
    if (pwdIsCorrect) {
      const token = jwt.sign({ userName }, process.env.JWT_SECRET)
      res.json({ ok: true, token })
    } else {
      res.status(401).json({ ok: false, message: 'Wrong Password!' })
    }
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: `User "${req.body.userName}" doesn't exist!`,
      error: debugOnly(error)
    })
  }
})

module.exports = route
