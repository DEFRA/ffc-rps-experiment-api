const actions = {
  get: function (actionCode) {
    if (!actions[actionCode]) {
      throw new Error(`Unknown action code: ${actionCode}`)
    }
    return actions[actionCode]
  },

  GRH7: {
    name: 'Haymaking supplement',
    supplementFor: 'CLIG3',
    applicableRules: ['supplement-area-matches-parent']
  },
  CLIG3: {
    name: 'Manage grassland with very low nutrient inputs',
    supplementFor: null
  },
  SAM1: {
    name: 'Assess soil, produce a soil management plan and test soil organic matter',
    supplementFor: null,
    applicableRules: ['supplement-area-matches-parent', 'is-for-whole-parcel-area']
  }
}

const defaultConfig = {
  actions
}

module.exports = { defaultConfig }
