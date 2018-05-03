var cors = require('cors')
var express = require('express')
const bodyParser = require('body-parser')
var levelup = require('levelup')
var leveldown = require('leveldown')
var app = express()

app.use(cors())
app.use(bodyParser.json())

var db = levelup(leveldown('./mydb'))

// // 2) Put a key & value
// db.put('name', 'levelup', function (err) {
//   if (err) return console.log('Ooops!', err) // some kind of I/O error

//   // 3) Fetch by key
//   db.get('name', function (err, value) {
//     if (err) return console.log('Ooops!', err) // likely the key was not found

//     // Ta da!
//     console.log('name=' + value)
//   })
// })

app.post('/data', (req, res) => {
  const { userName } = req.body
  db.put(userName, JSON.stringify(req.body)).then(() =>
    db.get(userName, function (err, data) {
      if (err) throw err
      res.send(data.toString())
    })
  )
})

app.listen(5000, function () {
  console.log('server is running.............')
})
