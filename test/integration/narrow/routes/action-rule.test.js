const { initActionsCache, getAction, getActions, addRule, findRuleIndex, updateRule, deleteRule } = require('../../../../app/land-action')

jest.mock('../../../../app/land-action', () => {
  const originalModule = jest.requireActual('../../../../app/land-action')
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

describe('action rule routes', () => {
  const server = require('../../../../app/server')
  let actions

  beforeEach(async () => {
    actions = require('../../../../app/static-data/actions.json')
    initActionsCache.mockImplementation(() => {
      actions = JSON.parse(JSON.stringify(require('../../../../app/static-data/actions.json')))
    })
    getAction.mockImplementation((code) => actions.find(action => action.code === code))
    getActions.mockImplementation(() => actions)
    addRule.mockImplementation((actionObject, newRule) => {
      if (!actionObject.eligibilityRules) {
        actionObject.eligibilityRules = []
      }
      if (!actionObject.eligibilityRules.some(rule => rule.id === newRule.id)) {
        actionObject.eligibilityRules.push(newRule)
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
    await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  test('POST /action/{pathParam}/rule/ should add a rule successfully', async () => {
    const request = {
      method: 'POST',
      url: '/action/AB3/rule/',
      payload: {
        id: 'new-rule',
        config: {}
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result.message).toBe('Rule added successfully')
    const action = getAction('AB3')
    expect(action.eligibilityRules.some(rule => rule.id === 'new-rule')).toBe(true)
  })

  test('POST /action/{pathParam}/rule/ should return 400 for non-existent action', async () => {
    const request = {
      method: 'POST',
      url: '/action/NON_EXISTENT/rule/',
      payload: {
        id: 'new-rule',
        config: {}
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.error).toBe('Action not found')
  })

  test('POST /action/{pathParam}/rule/ should not add duplicate rule', async () => {
    const request = {
      method: 'POST',
      url: '/action/AB3/rule/',
      payload: {
        id: 'is-below-moorland-line',
        config: {}
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    const action = getAction('AB3')
    const ruleCount = action.eligibilityRules.filter(rule => rule.id === 'is-below-moorland-line').length
    expect(ruleCount).toBe(1)
  })

  test('PUT /action/{pathParam}/rule/ should update a rule successfully', async () => {
    const request = {
      method: 'PUT',
      url: '/action/AB3/rule/',
      payload: {
        id: 'is-below-moorland-line',
        config: { updated: true }
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result.message).toBe('Rule updated successfully')
    const action = getAction('AB3')
    const rule = action.eligibilityRules.find(rule => rule.id === 'is-below-moorland-line')
    expect(rule.config.updated).toBe(true)
  })

  test('PUT /action/{pathParam}/rule/ should return 400 for non-existent action', async () => {
    const request = {
      method: 'PUT',
      url: '/action/NON_EXISTENT/rule/',
      payload: {
        id: 'is-below-moorland-line',
        config: { updated: true }
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.error).toBe('Action not found')
  })

  test('PUT /action/{pathParam}/rule/ should return 400 for non-existent rule', async () => {
    const request = {
      method: 'PUT',
      url: '/action/AB3/rule/',
      payload: {
        id: 'non-existent-rule',
        config: { updated: true }
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.error).toBe('Rule not found')
  })

  test('DELETE /action/{pathParam}/rule/ should delete a rule successfully', async () => {
    const request = {
      method: 'DELETE',
      url: '/action/AB3/rule/',
      payload: {
        id: 'is-below-moorland-line'
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
    expect(response.result.message).toBe('Rule deleted successfully')
    const action = getAction('AB3')
    expect(action.eligibilityRules.some(rule => rule.id === 'is-below-moorland-line')).toBe(false)
  })

  test('DELETE /action/{pathParam}/rule/ should return 400 for non-existent action', async () => {
    const request = {
      method: 'DELETE',
      url: '/action/NON_EXISTENT/rule/',
      payload: {
        id: 'is-below-moorland-line'
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.error).toBe('Action not found')
  })

  test('DELETE /action/{pathParam}/rule/ should return 400 for non-existent rule', async () => {
    const request = {
      method: 'DELETE',
      url: '/action/AB3/rule/',
      payload: {
        id: 'non-existent-rule'
      }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
    expect(response.result.error).toBe('Rule not found')
  })
})
