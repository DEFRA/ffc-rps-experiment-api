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

jest.mock('../../../../app/land-parcel', () => {
  const originalModule = jest.requireActual('../../../../app/land-parcel')
  return {
    ...originalModule,
    getLandParcelsFromDb: jest.fn()
  }
})

const server = require('../../../../app/server')
const { getLandParcelsFromDb } = require('../../../../app/land-parcel')

describe('Land parcel v2 test', () => {
  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
    jest.clearAllMocks()
  })

  test('GET /land-parcel/v2 should return 200 when a valid sbi is provided', async () => {
    const mockData = [{ id: 1, sbi: 200599768, parcel: 'Parcel 1' }]
    getLandParcelsFromDb.mockResolvedValueOnce(mockData)

    const request = {
      method: 'GET',
      url: '/land-parcel/v2/200599768'
    }

    const response = await server.inject(request)
    expect(getLandParcelsFromDb).toHaveBeenCalledWith(200599768)
    expect(response.statusCode).toBe(200)
    const payload = JSON.parse(response.payload)
    expect(payload.length).toEqual(1)
    expect(payload[0].sbi).toEqual(200599768)
  })

  test('GET /land-parcel/v2 should return 404 when an unknown sbi is provided', async () => {
    getLandParcelsFromDb.mockResolvedValueOnce([])

    const request = {
      method: 'GET',
      url: '/land-parcel/v2/999999999'
    }

    const response = await server.inject(request)
    expect(getLandParcelsFromDb).toHaveBeenCalledWith(999999999)
    expect(response.statusCode).toBe(404)
    expect(response.payload).toEqual('No land parcels found for the provided sbi')
  })

  test('GET /land-parcel/v2 should return 400 when a non-integer sbi is provided', async () => {
    const request = {
      method: 'GET',
      url: '/land-parcel/v2/ABC123'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })
})
