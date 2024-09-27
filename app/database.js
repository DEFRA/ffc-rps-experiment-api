const { newDb } = require('pg-mem')
const fs = require('fs')
const path = require('path')
const db = newDb()

const initializeDatabase = async () => {
  try {
    const createTablesSql = fs.readFileSync(path.join(__dirname, '../init-db/create-tables.sql'), 'utf8')
    const insertDataSql = fs.readFileSync(path.join(__dirname, '../init-db/insert-data.sql'), 'utf8')
    await db.public.none(createTablesSql)
    await db.public.none(insertDataSql)
  } catch (err) {
    console.error('Error during initialization:', err)
    throw err
  }
}

module.exports = {
  initializeDatabase,
  db
}
