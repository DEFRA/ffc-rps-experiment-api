const server = require('./server')
const { initializeDatabase } = require('./database')

const init = async () => {
  try {
    await initializeDatabase()
    await server.start()
    console.log('Server running on %s', server.info.uri)
  } catch (error) {
    console.error('Error during initialization:', error)
  }
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
