const { defaultConfig } = require('./config')

function supplementAreaMatchesParent (config, application) {
  const { actions } = config
  const { areaAppliedFor, actionCodeAppliedFor, landParcel: { existingAgreements } } = application

  const supplementForCode = actions[actionCodeAppliedFor]?.supplementFor

  const existingAgreement = existingAgreements.find(
    (agreement) => agreement.code === supplementForCode
  )

  return existingAgreement?.area === areaAppliedFor
}

function isBelowMoorlandLine (config, application) {
  const moorlandLineStatus = application.landParcel.moorlandLineStatus
  return moorlandLineStatus === 'Below'
}

function isForWholeParcelArea (config, application) {
  const { actions } = config
  const { areaAppliedFor, actionCodeAppliedFor, landParcel: { area } } = application

  const action = actions[actionCodeAppliedFor]

  return action?.wholeParcelOnly === true && areaAppliedFor === area
}

const rules = {
  'supplement-area-matches-parent': supplementAreaMatchesParent,
  'is-below-moorland-line': isBelowMoorlandLine,
  'is-for-whole-parcel-area': isForWholeParcelArea
}

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
    { ruleName, passed: executeRule(ruleName, application, config) }
  ))

  console.log(results)
  return { results, overallResult: results.every((result) => result.passed) }
}

module.exports = {
  executeRule,
  executeApplicableRules
}
