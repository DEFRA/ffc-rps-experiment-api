describe('Land parcel test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /land-parcel should return 200 when a valid sbi is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/200599768'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).length).toEqual(2)
  })

  test('GET /land-parcel should return 404 when an unknown sbi is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/1235678'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toEqual('No land parcels found for the provided sbi')
  })

  test('GET /land-parcel should return 400 when a non-integer sbi is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/ABC123'
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })
})
