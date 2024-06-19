describe('Fraud test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /fraud/200599768 should return 200, fraud flagged', async () => {
    const request = {
      method: 'GET',
      url: '/fraud/200599768'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).isFlaggedForFraud).toEqual(true)
  })

  test('GET /fraud/106846848 should return 200, no fraud flagged', async () => {
    const request = {
      method: 'GET',
      url: '/fraud/106846848'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).isFlaggedForFraud).toEqual(false)
  })

  test('GET /fraud should return 404 when an unknown SBI is provided', async () => {
    const request = {
      method: 'GET',
      url: '/fraud/1235678'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toEqual(
      '{"message":"No businesses found with SBI 1235678"}'
    )
  })
})
