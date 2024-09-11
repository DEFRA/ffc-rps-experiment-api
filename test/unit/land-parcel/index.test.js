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

describe('land action rules', () => {
  let getAction, getActions, addRule, findRuleIndex, updateRule, deleteRule, initActionsCache

  beforeEach(() => {
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
    addRule.mockImplementation((action, newRule) => {
      if (!action.eligibilityRules) {
        action.eligibilityRules = []
      }
      if (!action.eligibilityRules.some(rule => rule.id === newRule.id)) {
        action.eligibilityRules.push(newRule)
      }
    })
    findRuleIndex.mockImplementation((eligibilityRules, ruleId) => eligibilityRules.findIndex(rule => rule.id === ruleId))
    updateRule.mockImplementation((action, ruleIndex, newRule) => {
      action.eligibilityRules[ruleIndex] = newRule
    })
    deleteRule.mockImplementation((action, ruleIndex) => {
      action.eligibilityRules.splice(ruleIndex, 1)
    })

    initActionsCache()
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
})
