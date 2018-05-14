const bcrypt = require('bcrypt')
const up = require('levelup')
const down = require('leveldown')
const encode = require('encoding-down')
const levelDB = name =>
  up(encode(down(`${__dirname}/db/${name}`), { valueEncoding: 'json' }))

async function seedAdmin (db) {
  return db.put('admin', {
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
