describe('land action rules', () => {
  let getAction, getActions, addRule, findRuleIndex, updateRule, deleteRule, initActionsCache

  beforeEach(() => {
    jest.mock('../../../app/land-action', () => {
      const originalModule = jest.requireActual('../../../app/land-action')
      return {
        ...originalModule,
        initActionsCache: jest.fn(),
        getAction: jest.fn(),
        getActions: jest.fn()
      }
    })

    const landAction = require('../../../app/land-action')
    getAction = landAction.getAction
    getActions = landAction.getActions
    addRule = landAction.addRule
    findRuleIndex = landAction.findRuleIndex
    updateRule = landAction.updateRule
    deleteRule = landAction.deleteRule
    initActionsCache = landAction.initActionsCache

    const mockActions = [
      { code: 'SAM1', eligibilityRules: [{ id: 'is-below-moorland-line', config: {} }] }
    ]
    
    initActionsCache.mockImplementation(() => {
      landAction.actions = mockActions
    })

    getAction.mockImplementation((code) => mockActions.find(action => action.code === code))
    getActions.mockImplementation(() => mockActions)

    initActionsCache()
})

describe('get land actions', () => {
  test('should return an array of all land actions', () => {
    const actions = getActions()
    expect(actions.length).toEqual(8)
  })
})

  test('should add a rule to a land action', () => {
    const action = getAction('SAM1')
    const newRule = { id: 'new-rule', config: {} }
    addRule(action, newRule)
    expect(action.eligibilityRules.some(rule => rule.id === 'new-rule')).toBe(true)
  })

  test('should not add a duplicate rule to a land action', () => {
    const action = getAction('SAM1')
    const newRule = { id: 'is-below-moorland-line', config: {} }
    addRule(action, newRule)
    const ruleCount = action.eligibilityRules.filter(rule => rule.id === 'is-below-moorland-line').length
    expect(ruleCount).toBe(1)
  })

  test('should find the index of a rule in eligibilityRules', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    expect(ruleIndex).toBeGreaterThanOrEqual(0)
  })

  test('should return -1 if rule is no>>>>>> 012d24c (rps-215 - add min and max parcel area rules)t found in eligibilityRules', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'non-existent-rule')
    expect(ruleIndex).toBe(-1)
  })

  test('should update a rule in a land action', () => {
    const action = getAction('SAM1')
    const updatedRule = { id: 'is-below-moorland-line', config: { updated: true } }
    const updateSuccessful = updateRule(action, updatedRule)
    expect(updateSuccessful).toBe(true)
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    expect(action.eligibilityRules[ruleIndex].config.updated).toBe(true)
  })

  test('should return false if rule to update is not found', () => {
    const action = getAction('SAM1')
    const updatedRule = { id: 'non-existent-rule', config: { updated: true } }
    const updateSuccessful = updateRule(action, updatedRule)
    expect(updateSuccessful).toBe(false)
  })

  test('should delete a rule from a land action', () => {
    const action = getAction('SAM1')
    const deleteSuccessful = deleteRule(action, 'is-below-moorland-line')
    expect(deleteSuccessful).toBe(true)
    expect(action.eligibilityRules.some(rule => rule.id === 'is-below-moorland-line')).toBe(false)
  })

  test('should return false if rule to delete is not found', () => {
    const action = getAction('SAM1')
    const deleteSuccessful = deleteRule(action, 'non-existent-rule')
    expect(deleteSuccessful).toBe(false)
  })
})
