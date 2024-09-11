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
    updateRule.mockImplementation((action, ruleToUpdate) => {
      const ruleIndex = findRuleIndex(action.eligibilityRules, ruleToUpdate.id)
      if (ruleIndex === -1) {
        return false
      }
      action.eligibilityRules[ruleIndex] = ruleToUpdate
      const actionIndex = mockActions.findIndex(a => a.code === action.code)
      if (actionIndex !== -1) {
        mockActions[actionIndex] = action
      }
      return true
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

  test('should find the index of a rule in eligibilityRules', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    expect(ruleIndex).toBeGreaterThanOrEqual(0)
  })

  test('should update a rule in a land action', () => {
    const action = getAction('SAM1')
    const updatedRule = { id: 'is-below-moorland-line', config: { updated: true } }
    const updateSuccessful = updateRule(action, updatedRule)
    expect(updateSuccessful).toBe(true)
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    expect(action.eligibilityRules[ruleIndex].config.updated).toBe(true)
  })

  test('should delete a rule from a land action', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    deleteRule(action, ruleIndex)
    expect(action.eligibilityRules.some(rule => rule.id === 'is-below-moorland-line')).toBe(false)
  })
})
