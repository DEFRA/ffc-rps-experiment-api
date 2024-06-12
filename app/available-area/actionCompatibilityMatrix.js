module.exports = {
  actionCompatibilityMatrix: {
    x: ['y'],
    y: ['x', 'z'],
    z: ['y'],
    za: ['zb'],
    zb: ['za']
  },
  updateMatrix (newEntries) {
    validateUpdate(newEntries, this.actionCompatibilityMatrix)
    applyUpdate(newEntries, this.actionCompatibilityMatrix)
  }
}

function validateUpdate (newEntries, actionCompatibilityMatrix) {
  const updatedMatrix = { ...actionCompatibilityMatrix }
  for (const key in newEntries) {
    updatedMatrix[key] = newEntries[key]
  }

  for (const key in updatedMatrix) {
    for (const value of updatedMatrix[key]) {
      if (!Object.prototype.hasOwnProperty.call(updatedMatrix, value) && value !== '') {
        throw new Error(`Action "${value}" does not reference any key in the updated matrix`)
      }
    }
  }
}

function applyUpdate (newEntries, actionCompatibilityMatrix) {
  for (const key in newEntries) {
    actionCompatibilityMatrix[key] = newEntries[key]
  }
}
