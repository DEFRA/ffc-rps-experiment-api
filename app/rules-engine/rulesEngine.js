const { rules } = require('./rules')

const executeRule = (ruleName, application, action) => {
  const rule = rules[ruleName]

  if (!rule) {
    throw new Error(`Unknown rule: ${ruleName}`)
  }

  return rule(application, action)
}

const executeRules = (application, action) => {
  if (!action) {
    throw new Error(`Undefined action: ${action}`)
  }
  const results = action.eligibilityRules.map((rule) => (
    { ruleName: rule.id, ...executeRule(rule.id, application, action) }
  ))

  return { results, passed: results.every((result) => result.passed === true) }
}

module.exports = {
  executeRule,
  executeRules
}
