const { getAction, getActions, addRule, findRuleIndex, updateRule, deleteRule } = require('../../../app/land-action')

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

  test('should return undefined when an invalid action code is provided', () => {
    const action = getAction('INVALID_CODE')
    expect(action).toBeUndefined()
  })
})

describe('land action rules', () => {
  beforeEach(() => {
    jest.resetModules()

    jest.mock('../../../app/land-action', () => {
      const originalModule = jest.requireActual('../../../app/land-action')
      return {
        ...originalModule,
        initActionsCache: jest.fn(),
        getAction: jest.fn(),
        getActions: jest.fn(),
        addRule: jest.fn(),
        findRuleIndex: jest.fn(),
        updateRule: jest.fn(),
        deleteRule: jest.fn()
      }
    })

    const landAction = require('../../../app/land-action')

    // Mock data
    const mockActions = [
      { code: 'SAM1', eligibilityRules: [{ id: 'is-below-moorland-line', config: {} }] },
      { code: 'SAM2', eligibilityRules: [] } // Reset to ensure it's empty initially
    ]

    // Mock implementations
    landAction.initActionsCache.mockImplementation(() => {
      landAction.actions = mockActions
    })

    landAction.getAction.mockImplementation((code) => mockActions.find(action => action.code === code))
    landAction.getActions.mockImplementation(() => mockActions)
    landAction.addRule.mockImplementation((action, newRule) => {
      if (!action.eligibilityRules) {
        action.eligibilityRules = []
      }
      if (!action.eligibilityRules.some(rule => rule.id === newRule.id)) {
        action.eligibilityRules.push(newRule)
      }
    })
    landAction.findRuleIndex.mockImplementation((eligibilityRules, ruleId) => eligibilityRules.findIndex(rule => rule.id === ruleId))
    landAction.updateRule.mockImplementation((action, ruleIndex, newRule) => {
      action.eligibilityRules[ruleIndex] = newRule
    })
    landAction.deleteRule.mockImplementation((action, ruleIndex) => {
      action.eligibilityRules.splice(ruleIndex, 1)
    })

    landAction.initActionsCache() // Reinitialize the cache before each test
  })

  test('should add a rule to a land action', () => {
    const action = getAction('SAM1')
    const newRule = { id: 'new-rule', config: {} }
    addRule(action, newRule)
    expect(action.eligibilityRules.some(rule => rule.id === 'new-rule')).toBe(true)
  })

  test('should initialize eligibilityRules if undefined when adding a rule', () => {
    const action = getAction('SAM2')
    const newRule = { id: 'another-new-rule', config: {} }
    action.eligibilityRules = undefined
    addRule(action, newRule)
    expect(action.eligibilityRules).toBeDefined()
    expect(action.eligibilityRules.length).toBe(1)
    expect(action.eligibilityRules[0].id).toBe('another-new-rule')
  })

  test('should not add a duplicate rule to a land action', () => {
    const action = getAction('SAM1')
    const newRule = { id: 'is-below-moorland-line', config: {} }
    addRule(action, newRule)
    expect(action.eligibilityRules.filter(rule => rule.id === 'is-below-moorland-line').length).toBe(1)
  })

  test('should find the index of a rule in eligibilityRules', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    expect(ruleIndex).toBeGreaterThanOrEqual(0)
  })

  test('should return -1 when rule is not found in eligibilityRules', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'non-existent-rule')
    expect(ruleIndex).toBe(-1)
  })

  test('should update a rule in a land action', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    const updatedRule = { id: 'is-below-moorland-line', config: { updated: true } }
    updateRule(action, ruleIndex, updatedRule)
    expect(action.eligibilityRules[ruleIndex].config.updated).toBe(true)
  })

  test('should not update any rule if rule index is invalid', () => {
    const action = getAction('SAM1')
    const ruleIndex = -1
    const updatedRule = { id: 'non-existent-rule', config: { updated: true } }
    expect(() => updateRule(action, ruleIndex, updatedRule)).not.toThrow()
  })

  test('should delete a rule from a land action', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    deleteRule(action, ruleIndex)
    expect(action.eligibilityRules.some(rule => rule.id === 'is-below-moorland-line')).toBe(false)
  })

  test('should not throw an error when deleting a non-existent rule', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'non-existent-rule')
    expect(() => deleteRule(action, ruleIndex)).not.toThrow()
  })

  test('should update actions array after adding a new rule', () => {
    const action = getAction('SAM1')
    const newRule = { id: 'new-action-rule', config: {} }
    addRule(action, newRule)
    const updatedAction = getAction('SAM1')
    expect(updatedAction.eligibilityRules.some(rule => rule.id === 'new-action-rule')).toBe(true)
  })

  test('should update actions array after deleting a rule', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    deleteRule(action, ruleIndex)
    const updatedAction = getAction('SAM1')
    expect(updatedAction.eligibilityRules.some(rule => rule.id === 'is-below-moorland-line')).toBe(false)
  })
})
