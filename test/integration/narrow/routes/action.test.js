describe('available area calculation test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('GET /action route should return 400 when parcel-id query parameter is missing', async () => {
    const request = {
      method: 'GET',
      url: '/action'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })

  test('GET /action route should return 200 when parcel-id query parameter is provided', async () => {
    const request = {
      method: 'GET',
      url: '/action?parcel-id=123'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result).toEqual([
      {
        code: 'CSAM2',
        description: 'Multi-species winter cover crop',
        eligibleLandUses: ['TG01', 'FA01', 'TC01'],
        payment: { amountPerHectare: 129 }
      }
    ])
  })
})
