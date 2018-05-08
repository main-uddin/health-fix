const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const levelup = require('levelup')
const leveldown = require('leveldown')
const encodingDown = require('encoding-down')
const jwt = require('jsonwebtoken')

const meals = [
  {
    breakfast: 'ruti',
    lunch: 'rice',
    dinner: 'rice'
  },
  {
    breakfast: 'khechori',
    lunch: 'nanna-biriyani',
    dinner: 'ruti'
  },
  {
    breakfast: 'porota',
    lunch: 'shahi-morog-polaw',
    dinner: 'rice'
  },
  {
    breakfast: 'tehari',
    lunch: 'absoulate',
    dinner: 'gaza'
  }
]

const passport = require('passport')
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')

const app = express()
const db = levelup(encodingDown(leveldown('./mydb'), { valueEncoding: 'json' }))

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'payerlal'
}

passport.use(
  new JwtStrategy(jwtOptions, function (payload, cb) {
    if (!payload.userName) return cb(null, false)
    db
      .get(payload.userName)
      .then(user => {
        const { userName, email } = user
        cb(null, { userName, email })
      })
      .catch(err => {
        if (err) console.error(err)
        cb(null, false)
      })
  })
)

app.use(cors())
app.use(bodyParser.json())
app.use(passport.initialize())

const authenticate = passport.authenticate('jwt', { session: false })

app.put('/auth', function (req, res) {
  const { userName, email, password } = req.body
  db
    .put(userName, { userName, email, password })
    .then(() => {
      res.json({ ok: true, message: 'Data sucessfully inserted!' })
    })
    .catch(e => {
      res.json({ ok: false, error: e })
    })
})

app.post('/auth', (req, res) => {
  const { userName, password } = req.body
  db
    .get(userName)
    .then(data => {
      if (data.password === password) {
        const token = jwt.sign({ userName }, jwtOptions.secretOrKey)
        res.json({ ok: true, token })
      } else {
        res.status(401).json({ ok: false, message: 'wrong password' })
      }
    })
    .catch(err => {
      if (err) console.error(err)
      res.status(401).json({ ok: false, message: 'user not found' })
    })
})

app.get('/data', authenticate, function (req, res) {
  res.json({ message: 'fuck you' })
})

app.get('/meals', authenticate, function (req, res) {
  console.log(req.user)
  res.json({ meals })
})

app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000/')
})
