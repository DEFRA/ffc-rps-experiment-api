module.exports = {
  actionCompatibilityMatrix: {
    x: ['y'],
    y: ['x', 'z'],
    z: ['y'],
    za: ['zb'],
    zb: ['za']
  },
  updateMatrix (newEntries) {
    for (const key in newEntries) {
      if (Object.prototype.hasOwnProperty.call(this.actionCompatibilityMatrix, key)) {
        this.actionCompatibilityMatrix[key] = newEntries[key]
      } else {
        throw new Error(`Key "${key}" does not exist in the matrix`)
      }
    }
  }
}
