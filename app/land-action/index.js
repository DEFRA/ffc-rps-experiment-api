const fs = require('fs')
const path = require('path')

let actions = []

const initActionsCache = () => {
  actions = JSON.parse(fs.readFileSync(path.join(__dirname, '../static-data/actions.json'), 'utf8'))
}

const getAction = (code) => {
  return actions.find((action) => action.code === code)
}

const getActions = () => {
  return actions
}

function addRule (action, newRule) {
  if (!action.eligibilityRules) {
    action.eligibilityRules = []
  }
  if (!action.eligibilityRules.some(rule => rule.id === newRule.id)) {
    action.eligibilityRules.push(newRule)
  }
  const actionIndex = actions.findIndex(a => a.code === action.code)
  if (actionIndex !== -1) {
    actions[actionIndex] = action
  }
}

const findRuleIndex = (eligibilityRules, ruleId) => {
  return eligibilityRules.findIndex(rule => rule.id === ruleId)
}

const updateRule = (action, ruleToUpdate) => {
  const ruleIndex = findRuleIndex(action.eligibilityRules, ruleToUpdate.id)
  if (ruleIndex === -1) {
    return false
  }
  action.eligibilityRules[ruleIndex] = ruleToUpdate
  const actionIndex = actions.findIndex(a => a.code === action.code)
  if (actionIndex !== -1) {
    actions[actionIndex] = action
  }
  return true
}

function deleteRule (action, ruleIndex) {
  action.eligibilityRules.splice(ruleIndex, 1)
  const actionIndex = actions.findIndex(a => a.code === action.code)
  if (actionIndex !== -1) {
    actions[actionIndex] = action
  }
}

initActionsCache()

module.exports = {
  getAction,
  getActions,
  addRule,
  findRuleIndex,
  updateRule,
  deleteRule
}
