describe('Rules endpoint', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('POST /rule-execution should return 200 when a valid application is passed', async () => {
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        area: 100,
        existingAgreements: [{ area: 100, code: 'LIG3' }]
      }
    }
    const request = {
      method: 'POST',
      url: '/rule-execution',
      payload: application
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toEqual('{"results":[{"ruleName":"supplement-area-matches-parent","passed":true}],"passed":true}')
  })

  test('POST /payment should return 400 when an unknown action code is used is passed', async () => {
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'HAMHOCKS',
      landParcel: {
        area: 100,
        existingAgreements: [{ area: 100, code: 'LIG3' }]
      }
    }
    const request = {
      method: 'POST',
      url: '/rule-execution',
      payload: application
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })

  test('POST /payment should return 400 when a badly formed application is passed', async () => {
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'SAM1',
      landParcel: {
        hamhocks: 'yes',
        existingAgreements: [{ area: 100, code: 'LIG3' }]
      }
    }
    const request = {
      method: 'POST',
      url: '/rule-execution',
      payload: application
    }

    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })
})
