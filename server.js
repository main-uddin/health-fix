const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const levelup = require('levelup')
const leveldown = require('leveldown')
const encodingDown = require('encoding-down')
const jwt = require('jsonwebtoken')

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

// TODO: move to database
const meals = [
  {
    breakfast: 'ruti',
    lunch: 'rice',
    dinner: 'rice',
    subscribers: []
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

app.get('/meals', authenticate, function (req, res) {
  const mealsList = meals.map(meal => {
    const subscribed =
      meal.subscribers && meal.subscribers.indexOf(req.user.userName) > -1
    const { lunch, dinner, breakfast } = meal
    return { lunch, dinner, breakfast, subscribed }
  })
  res.json(mealsList)
})

app.put('/meals/:id', authenticate, function (req, res) {
  if (!meals[req.params.id]) {
    res.status(404).json({ ok: false, message: 'meal not found' })
    return
  }
  const oldsub = meals[req.params.id]['subscribers']
  meals[req.params.id]['subscribers'] = (oldsub || []).concat(req.user.userName)
  res.json({ ok: true, message: 'subscribed to meal ' + req.params.id })
})

app.delete('/meals/:id', authenticate, function (req, res) {
  if (!meals[req.params.id] || !meals[req.params.id]['subscribers']) {
    res
      .status(404)
      .json({ ok: false, message: 'meal not found or not subscribed' })
    return
  }
  const subIdx = meals[req.params.id]['subscribers'].indexOf(req.user.userName)
  meals[req.params.id]['subscribers'].splice(subIdx, 1)
  res.json({ ok: true, message: 'unsubscribed from meal ' + req.params.id })
})

app.listen(5000, function () {
  console.log('Server is running on http://localhost:5000/')
})
