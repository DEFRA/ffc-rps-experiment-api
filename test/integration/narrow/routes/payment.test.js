describe('Land parcel test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /payment should return 200 when a valid action code and hectarage provided', async () => {
    const request = {
      method: 'GET',
      url: '/payment?action-code=SAM2&hectares-applied-for=1.1'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual('141.9')
  })

  test('GET /payment should return 400 when query strings are not provided', async () => {
    const request = {
      method: 'GET',
      url: '/payment'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.payload).toEqual(
      '{"statusCode":400,"error":"Bad Request","message":"Invalid request query input"}'
    )
  })

  test('GET /payment should return 404 when given an invalid action code', async () => {
    const request = {
      method: 'GET',
      url: '/payment?action-code=SEE_SAM_TOO&hectares-applied-for=1.1'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toEqual('No action found for code SEE_SAM_TOO')
  })
})
