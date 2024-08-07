const ACTION_COMPATIBILITY_MATRIX = {
  x: ['y'],
  y: ['x', 'z'],
  z: ['y'],
  za: ['zb'],
  zb: ['za'],
  SAM1: ['SAM3', 'SAM2', 'AB3'],
  SAM2: ['SAM1', 'SAM3'],
  SAM3: ['SAM1', 'SAM2'],
  LIG1: [],
  AB3: ['SAM1']
}

function applyUpdate (newEntries, actionCompatibilityMatrix) {
  for (const key in newEntries) {
    actionCompatibilityMatrix[key] = newEntries[key]
  }
}

module.exports = {
  actionCompatibilityMatrix: ACTION_COMPATIBILITY_MATRIX,
  updateMatrix (newEntries) {
    applyUpdate(newEntries, ACTION_COMPATIBILITY_MATRIX)
  }
}
