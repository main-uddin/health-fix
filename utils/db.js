const up = require('levelup')
const down = require('leveldown')
const encode = require('encoding-down')
const levelDB = name =>
  up(encode(down(`./db/${name}`), { valueEncoding: 'json' }))

async function seedAdmin () {
  return levelDB('users').put('admin', {
    userName: 'admin',
    password: bcrypt.hashSync('admin', 9),
    email: 'admin@gmail.com',
    admin: true
  })
}

module.exports = {
  levelDB,
  seedAdmin
}
