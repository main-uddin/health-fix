import levelup from 'levelup'
import encoding from 'encoding-down'
import local from 'localstorage-down'

const db = levelup(encoding(local('newdb'), { valueEncoding: 'json' }))
export default db
