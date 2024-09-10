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

initActionsCache()

module.exports = {
  getAction,
  getActions
}
