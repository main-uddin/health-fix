const env = require('dotenv').config()
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const passport = require('passport')
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')

if (env.error) throw env.error

const { pickOnly } = require('./utils/')
const { seedAdmin, levelDB } = require('./utils/db')

const usersdb = levelDB('users')

const app = express()

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(
  new JwtStrategy(jwtOptions, async (payload, cb) => {
    try {
      if (!payload.userName) throw new Error('User not found!')
      const user = await usersdb.get(payload.userName)
      cb(null, pickOnly(['userName', 'email', 'admin'], user))
    } catch (err) {
      cb(null, false)
    }
  })
)

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())

const authenticate = passport.authenticate('jwt', { session: false })

app.options('*', cors())
app.use('/auth', require('./routes/auth')(usersdb))
app.use('/meals', require('./routes/meals'))

app.get('/admin', authenticate, (req, res) => {
  res.json({ admin: req.user.admin })
})

app.listen(5000, function () {
  seedAdmin(usersdb).then(() =>
    console.log('Server is running on http://localhost:5000/')
  )
})
