const { defaultConfig } = require('./config')
const { rules } = require('./rules')

const executeRule = (ruleName, application, config = defaultConfig) => {
  const rule = rules[ruleName]

  if (!rule) {
    throw new Error(`Unknown rule: ${ruleName}`)
  }

  return rule(application, config)
}

const executeApplicableRules = (application, config = defaultConfig) => {
  const { actions } = config
  const { actionCodeAppliedFor } = application

  const action = actions[actionCodeAppliedFor]

  if (!action) {
    throw new Error(`Unknown action code: ${actionCodeAppliedFor}`)
  }

  const { applicableRules } = action

  const results = applicableRules.map((ruleName) => (
    { ruleName, ...executeRule(ruleName, application, config) }
  ))

  return { results, passed: results.every((result) => result.passed === true) }
}

module.exports = {
  executeRule,
  executeApplicableRules
}
