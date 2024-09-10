jest.mock('../../../app/land-action', () => {
  const landAction = jest.requireActual('../../../app/land-action')
  return {
    ...landAction,
    initActionsCache: jest.fn()
  }
})

const { getAction, getActions, addRule, findRuleIndex, updateRule, deleteRule, initActionsCache } = require('../../../app/land-action')

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
  let mockActions

  beforeEach(() => {
    mockActions = [
      { code: 'SAM1', eligibilityRules: [{ id: 'is-below-moorland-line', config: {} }] }
    ]
    initActionsCache.mockImplementation(() => {
      require('../../../app/land-action').actions = mockActions
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
    const newRule = { id: 'is-below-moorland-line', config: {} } // Same ID as existing rule
    addRule(action, newRule)
    expect(action.eligibilityRules.length).toBe(1) // Length should remain the same
  })

  test('should find the index of a rule in eligibilityRules', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    expect(ruleIndex).toBeGreaterThanOrEqual(0)
  })

  test('should return -1 for a non-existent rule', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'non-existent-rule')
    expect(ruleIndex).toEqual(-1)
  })

  test('should update a rule in a land action', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    const updatedRule = { id: 'is-below-moorland-line', config: { updated: true } }
    updateRule(action, ruleIndex, updatedRule)
    expect(action.eligibilityRules[ruleIndex].config.updated).toBe(true)
  })

  test('should handle updating a rule with an invalid index', () => {
    const action = getAction('SAM1')
    const ruleIndex = -1 // Invalid index
    const updatedRule = { id: 'is-below-moorland-line', config: { updated: true } }
    updateRule(action, ruleIndex, updatedRule)
    expect(action.eligibilityRules.some(rule => rule.config.updated)).toBe(false) // No updates should be made
  })

  test('should delete a rule from a land action', () => {
    const action = getAction('SAM1')
    const ruleIndex = findRuleIndex(action.eligibilityRules, 'is-below-moorland-line')
    deleteRule(action, ruleIndex)
    expect(action.eligibilityRules.some(rule => rule.id === 'is-below-moorland-line')).toBe(false)
  })

  test('should handle deleting a rule with an invalid index', () => {
    const action = getAction('SAM1')
    const ruleIndex = -1 // Invalid index
    deleteRule(action, ruleIndex)
    expect(action.eligibilityRules.length).toBe(1) // No deletion should occur
  })
})
