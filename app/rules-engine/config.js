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
  },
  SAM1: {
    name: 'Assess soil, produce a soil management plan and test soil organic matter',
    supplementFor: null,
    wholeParcelOnly: true
  }
}

const defaultConfig = {
  actions
}

module.exports = { defaultConfig }
