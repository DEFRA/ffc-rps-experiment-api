function applyUpdate (newEntries, actionLandUseCompatibilityMatrix) {
  for (const key in newEntries) {
    actionLandUseCompatibilityMatrix[key] = newEntries[key]
  }
}

module.exports = {
  actionLandUseCompatibilityMatrix: {
    SAM1: ['AC32', 'PG01'],
    SAM2: ['AC32'],
    SAM3: ['PG01'],
    LIG1: ['PG01']
  },
  updateMatrix (newEntries) {
    applyUpdate(newEntries, this.actionLandUseCompatibilityMatrix)
  }
}
