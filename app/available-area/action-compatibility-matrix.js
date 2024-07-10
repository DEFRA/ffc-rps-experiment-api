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
    zb: ['za'],
    SAM1: ['SAM3', 'SAM2'],
    SAM2: ['SAM1', 'SAM3'],
    LIG1: []
  },
  updateMatrix (newEntries) {
    applyUpdate(newEntries, this.actionCompatibilityMatrix)
  }
}
