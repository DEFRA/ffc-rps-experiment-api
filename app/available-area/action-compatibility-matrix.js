const ACTION_COMPATIBILITY_MATRIX = {
  x: ['y'],
  y: ['x', 'z'],
  z: ['y'],
  za: ['zb'],
  zb: ['za'],
  SAM1: ['SAM3', 'SAM2', 'AB3', 'LIG1'], // correction LIG1 added
  SAM2: ['SAM1', 'SAM3', 'CSAM1'],
  SAM3: ['SAM1', 'SAM2', 'CSAM1'],
  LIG1: ['SAM1', 'CSAM1'], // correction LIG1 added
  AB3: ['SAM1', 'CSAM1'],
  GRH1: ['SAM1'],
  CSAM1: ['SAM2', 'SAM3', 'LIG1', 'GRH1', 'AB3']
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
