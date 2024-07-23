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

  test('POST /action-validation should return 200 when valid actions combination selected', async () => {
    const request = {
      method: 'POST',
      url: '/action-validation',
      payload: {
        actions: [{
          actionCode: 'SAM1',
          quantity: '4.2'
        }],
        landParcel: {
          area: '4.2',
          moorlandLineStatus: 'below',
          landUseCodes: ['PG01']
        }
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual('{"isValidCombination":true,"message":"Action combination valid"}')
  })

  test('POST /action-validation should return 400 when invalid actions combination selected', async () => {
    const request = {
      method: 'POST',
      url: '/action-validation',
      payload: { actions: ['SAM7'], landUseCodes: ['PG01'] }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.payload).toEqual('{"isValidCombination":false,"error":"Error code \\"Invalid combination of actions: No valid combination for land use code: PG01\\" is not defined, your custom type is missing the correct messages definition"}')
  })
})
