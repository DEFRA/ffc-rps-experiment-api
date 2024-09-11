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
}

function getRuleIndex (eligibilityRules, ruleId) {
  const ruleIndex = findRuleIndex(eligibilityRules, ruleId)
  if (ruleIndex === -1) {
    return undefined
  }
  return ruleIndex
}

const findRuleIndex = (eligibilityRules, ruleId) => {
  return eligibilityRules.findIndex(rule => rule.id === ruleId)
}

const updateRule = (action, ruleToUpdate) => {
  const ruleIndex = getRuleIndex(action.eligibilityRules, ruleToUpdate.id)
  if (ruleIndex === undefined) return false
  action.eligibilityRules[ruleIndex] = ruleToUpdate
  return true
}

function deleteRule (action, id) {
  const ruleIndex = getRuleIndex(action.eligibilityRules, id)
  if (ruleIndex === undefined) return false
  action.eligibilityRules.splice(ruleIndex, 1)
  return true
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
