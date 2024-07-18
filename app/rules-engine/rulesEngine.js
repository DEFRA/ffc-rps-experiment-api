const { defaultConfig } = require('./config')
const { rules } = require('./rules')

const executeRule = (ruleName, application, config = defaultConfig) => {
  const rule = rules[ruleName]

  if (!rule) {
    throw new Error(`Unknown rule: ${ruleName}`)
  }

  return rule(config, application)
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
    { ruleName, ruleOutput: executeRule(ruleName, application, config) }
  ))

  console.log(results)
  return { results, overallResult: results.every((result) => result.ruleOutput.passed === true) }
}

module.exports = {
  executeRule,
  executeApplicableRules
}
