global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: 'test-identifier' })
  })
)
jest.mock('../../../app/config')
const { recordApplication } = require('../../../app/crm')

afterAll(() => {
  fetch.mockClear()
})

describe('record application in CRM', () => {
  test('should login and add application to CRM application module when valid input provided', async () => {
    const recordedApplication = await recordApplication({
      applicantName: 'Test farmer',
      sbi: '123456789',
      scheme: 'SFI 2023',
      landParcelRef: 'SU4165 6971',
      paymentAmount: 258.00,
      landActions: [
        { actionCode: 'SAM2', description: 'action desc', quantity: 2.0 }
      ]
    })
    expect(recordedApplication.id).toEqual('test-identifier')
  })
})
