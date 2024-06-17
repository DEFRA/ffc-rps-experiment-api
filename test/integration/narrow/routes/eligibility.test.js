describe('eligibility test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('POST /eligibility route returns 200', async () => {
    const options = {
      method: 'POST',
      url: '/eligibility'
    }

    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.result).toBe(true)
  })

  afterEach(async () => {
    await server.stop()
  })
})
