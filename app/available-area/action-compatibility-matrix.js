function applyUpdate (newEntries, actionCompatibilityMatrix) {
  for (const key in newEntries) {
    console.log('*** key', key)
    console.log('actionCompatibilityMatrix', actionCompatibilityMatrix)
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
    SAM3: ['SAM1', 'SAM2'],
    LIG1: []
  },
  updateMatrix (newEntries) {
    applyUpdate(newEntries, this.actionCompatibilityMatrix)
  }
}
