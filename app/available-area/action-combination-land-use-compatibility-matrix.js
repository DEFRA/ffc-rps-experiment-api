function applyUpdate (newEntries, actionCombinationLandUseCompatibilityMatrix) {
  for (const key in newEntries) {
    actionCombinationLandUseCompatibilityMatrix[key] = newEntries[key]
  }
}
// TODO fix data - camel case
// TODO input validation for invalid action combos
// TODO look for a way to combine matrices
module.exports = {
  actionCombinationLandUseCompatibilityMatrix: {
    AC32: [['SAM1', 'SAM2'], ['SAM1'], ['SAM2']],
    PG01: [['SAM1', 'SAM3'], ['SAM1', 'LIG1'], ['SAM1'], ['SAM3'], ['LIG1']]
  },
  updateMatrix (newEntries) {
    applyUpdate(newEntries, this.actionCombinationLandUseCompatibilityMatrix)
  }
}
