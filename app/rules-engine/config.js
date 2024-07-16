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

module.exports = { defaultConfig }
