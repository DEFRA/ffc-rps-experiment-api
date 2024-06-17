describe('Land parcel test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  test('GET /land-parcel should return 200 when a valid SBI is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/200599768'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).length).toEqual(13)
  })

  test('GET /land-parcel should return 404 when an unknown SBI is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/1235678'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toEqual('No land parcels found for the provided SBI')
  })

  test('GET /land-parcel should return 400 when a non-integer SBI is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/ABC123'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })

  afterEach(async () => {
    await server.stop()
  })
})
