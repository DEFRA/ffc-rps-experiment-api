const { defaultConfig } = require('./config')

function supplementAreaMatchesParent (config, application) {
  const { actions } = config
  const { areaAppliedFor, actionCodeAppliedFor, landParcel: { existingAgreements } } = application

  const supplementForCode = actions[actionCodeAppliedFor]?.supplementFor

  const existingAgreement = existingAgreements.find(
    (agreement) => agreement.code === supplementForCode
  )

  if (!existingAgreement) {
    return { passed: false, message: `Action code ${actionCodeAppliedFor} requires an existing agreement for ${supplementForCode}` }
  }

  if (existingAgreement.area !== areaAppliedFor) {
    return { passed: false, message: `Application is for ${actionCodeAppliedFor} with an area of ${areaAppliedFor}ha, the action ${supplementForCode} is present but for an area of ${existingAgreement.area}ha. These areas should match.` }
  }

  return { passed: true }
}

function isBelowMoorlandLine (config, application) {
  const moorlandLineStatus = application.landParcel.moorlandLineStatus
  return { passed: moorlandLineStatus === 'below' }
}

function isForWholeParcelArea (config, application) {
  const { areaAppliedFor, landParcel: { area } } = application

  const passed = areaAppliedFor === area

  if (!passed) {
    return { passed, message: `Area applied for (${areaAppliedFor}ha) does not match parcel area (${area}ha)` }
  }

  return { passed: true }
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
    { ruleName, ruleOutput: executeRule(ruleName, application, config) }
  ))

  console.log(results)
  return { results, overallResult: results.every((result) => result.ruleOutput.passed === true) }
}

module.exports = {
  executeRule,
  executeApplicableRules
}
