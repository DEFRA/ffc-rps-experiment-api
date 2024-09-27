const server = require('../../app/server')
const { initializeDatabase } = require('../../app/database')

jest.mock('../../app/server', () => ({
  start: jest.fn(),
  info: { uri: 'http://localhost:3000' }
}))

jest.mock('../../app/database', () => ({
  initializeDatabase: jest.fn()
}))

describe('Application initialization', () => {
  let logSpy

  beforeEach(() => {
    jest.clearAllMocks()
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('should initialize database and start server', async () => {
    await require('../../app/index')
    expect(initializeDatabase).toHaveBeenCalled()
    expect(server.start).toHaveBeenCalled()
  })
})
