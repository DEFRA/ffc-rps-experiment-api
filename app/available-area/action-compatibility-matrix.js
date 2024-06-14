function applyUpdate (newEntries, actionCompatibilityMatrix) {
  for (const key in newEntries) {
    actionCompatibilityMatrix[key] = newEntries[key]
  }
}

module.exports = {
  actionCompatibilityMatrix: {
    x: ['y'],
    y: ['x', 'z'],
    z: ['y'],
    za: ['zb'],
    zb: ['za']
  },
  updateMatrix (newEntries) {
    applyUpdate(newEntries, this.actionCompatibilityMatrix)
  }
}
