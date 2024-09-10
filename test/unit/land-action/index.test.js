const { getAction, getActions } = require('../../../app/land-action')

describe('get land actions', () => {
  test('should return an array of all land actions', () => {
    const actions = getActions()
    expect(actions.length).toEqual(7)
  })
  test('should return a land action when a valid action code is provided', () => {
    const action = getAction('SAM1')
    expect(action.code).toEqual('SAM1')
    expect(action.description).toEqual('Assess soil, test soil organic matter and produce a soil management plan')
  })
})
