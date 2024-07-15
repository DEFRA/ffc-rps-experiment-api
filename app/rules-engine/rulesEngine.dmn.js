const { decisionTable } = require('@hbtgmbh/dmn-eval-js')

const fs = require('fs')

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

const dmn = `
application.areaAppliedFor = 
  application.landParcel.existingAgreements[code = 
      get value( actions, application.actionCodeAppliedFor ).supplementFor
  ].area`

function supplementAreaMatchesParent (config, application) {
  const dmnFromFile = fs.readFileSync('app/rules-engine/supplementAreaMatch.dmn', 'utf8')
  console.log(dmnFromFile)
  return decisionTable.parseDmnXml(dmnFromFile)
    .then((decisions) => {
      // DMN was successfully parsed
      // const context = { application, config }

      try {
        console.log(decisions)
        const data = decisionTable.evaluateDecision('asdfasdfwef', decisions, application)
        // data is the output of the decision execution
        // it is an array for hit policy COLLECT and RULE ORDER, and an object else
        // it is undefined if no rule matched

        return data
      } catch (err) {
        // failed to evaluate rule, maybe the context is missing some data?
        console.log(err)
      };
    })
    .catch(err => {
      // failed to parse DMN XML: either invalid XML or valid XML but invalid DMN
      console.log(err)
    })
}

function withConfig (config, fn) {
  return function (...args) {
    return fn(config, ...args)
  }
}

function createDmnRulesEngine (config = defaultConfig) {
  return {
    supplementAreaMatchesParent: withConfig(config, supplementAreaMatchesParent)
  }
}

module.exports = {
  dmn
}

module.exports = {
  createDmnRulesEngine
}
