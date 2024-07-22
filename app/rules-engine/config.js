const actions = {
  get: function (actionCode) {
    if (!actions[actionCode]) {
      throw new Error(`Unknown action code: ${actionCode}`)
    }
    return actions[actionCode]
  },

  GRH7: {
    name: 'Haymaking supplement',
    supplementFor: 'LIG3',
    applicableRules: ['supplement-area-matches-parent']
  },
  LIG1: {
    name: 'Manage grassland with low nutrient inputs (outside SDAs)',
    applicableRules: ['is-outside-sda']
  },
  LIG3: {
    name: 'Manage grassland with very low nutrient inputs'
  },
  SAM1: {
    name: 'Assess soil, produce a soil management plan and test soil organic matter',
    applicableRules: ['is-below-moorland-line', 'is-for-whole-parcel-area']
  },
  SAM2: {
    name: 'Multi-species winter cover crop',
    applicableRules: ['is-below-moorland-line']
  },
  SAM3: {
    name: 'Herbal leys',
    applicableRules: ['is-below-moorland-line']
  }
}

const defaultConfig = {
  actions
}

module.exports = { defaultConfig }
