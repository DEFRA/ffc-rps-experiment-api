const actions = {
  get: function (actionCode) {
    if (!actions[actionCode]) {
      throw new Error(`Unknown action code: ${actionCode}`)
    }
    return actions[actionCode]
  },

  GRH7: {
    name: 'Haymaking supplement',
    supplementFor: 'CLIG3'
  },
  CLIG3: {
    name: 'Manage grassland with very low nutrient inputs',
    supplementFor: null
  }
}

const defaultConfig = {
  actions
}

function withConfig (config, fn) {
  return function (...args) {
    return fn(config, ...args)
  }
}

function supplementAreaMatchesParent (config, application) {
  const { actions } = config
  const { areaAppliedFor, actionCodeAppliedFor, landParcel: { existingAgreements } } = application

  const actionAppliedFor = actions.get(actionCodeAppliedFor)
  const existingAgreement = existingAgreements.find((agreement) => agreement.code === actionAppliedFor.supplementFor)

  return existingAgreement?.area === areaAppliedFor
}

function isBelowMoorlandLine (config, application) {
  const moorlandLineStatus = application.landParcel.moorlandLineStatus
  return moorlandLineStatus === 'Below'
}

function createRulesEngine (config = defaultConfig) {
  return {
    supplementAreaMatchesParent: withConfig(config, supplementAreaMatchesParent),
    isBelowMoorlandLine: withConfig(config, isBelowMoorlandLine)
  }
}

module.exports = {
  createRulesEngine
}
