describe('Land parcel test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })
  test('POST /payment should return 200 when a valid action code and hectarage provided', async () => {
    const request = {
      method: 'POST',
      url: '/payment',
      payload: { actions: [{ 'action-code': 'SAM2', 'hectares-applied-for': 1.1 }], 'land-use-codes': ['AC32'] }
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result[0].payment).toEqual(141.9)
  })

  test('POST /payment should return 400 when items missing from payload form', async () => {
    const request = {
      method: 'POST',
      url: '/payment',
      payload: { actions: [{ 'action-code': 'SAM2', 'hectares-applied-for': 1.1 }] }
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.payload).toEqual(
      '{"statusCode":400,"error":"Bad Request","message":"Invalid request payload input"}'
    )
  })

  test('POST /payment should return 404 when given an invalid action code', async () => {
    const request = {
      method: 'POST',
      url: '/payment',
      payload: { actions: [{ 'action-code': 'SEE_SAM_TWO', 'hectares-applied-for': 1.1 }], 'land-use-codes': ['AC32'] }
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toEqual('{"message":"No action codes found for: ","actionCodes":["SEE_SAM_TWO"]}')
  })
})
