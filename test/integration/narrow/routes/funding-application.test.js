jest.mock('../../../../app/crm')
const { recordApplication } = require('../../../../app/crm')

describe('Funding application test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('POST /funding-application should return 200 when a valid application is provided', async () => {
    const request = {
      method: 'POST',
      url: '/funding-application'
    }
    const testRecordedApplication = { id: 'test-id-1' }
    recordApplication.mockResolvedValueOnce(testRecordedApplication)
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.payload).id).toEqual(testRecordedApplication.id)
  })

  test('POST /funding-application should return 500 when an unexpected error occurs', async () => {
    const request = {
      method: 'POST',
      url: '/funding-application'
    }
    const errMessage = 'unexpected error'
    recordApplication.mockImplementationOnce(() => {
      throw new Error(errMessage)
    })
    const response = await server.inject(request)
    expect(response.statusCode).toBe(500)
    expect(JSON.parse(response.payload).message).toEqual(errMessage)
  })
})
