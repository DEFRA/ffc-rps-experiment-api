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
      url: '/action?parcel-id=123&land-use-codes=AC32'
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result).toEqual([
      {
        code: 'SAM1',
        description: 'Assess soil, test soil organic matter and produce a soil management plan',
        eligibleLandUses: [
          'Various arable and horticultural land types'
        ],
        payment: {
          additionalPaymentPerAgreement: 95,
          amountPerHectare: 5.8
        }
      },
      {
        code: 'SAM2',
        description: 'Multi-species winter cover crop',
        eligibleLandUses: ['TG01', 'FA01', 'TC01'],
        payment: { amountPerHectare: 129 }
      }
    ])
  })
})
