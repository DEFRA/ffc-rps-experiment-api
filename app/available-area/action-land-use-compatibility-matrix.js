function applyUpdate (newEntries, actionCombinationLandUseCompatibilityMatrix) {
  for (const key in newEntries) {
    actionCombinationLandUseCompatibilityMatrix[key] = newEntries[key]
  }
}

// TODO - given list of actions compatible w land use code, and action compatibility matrix,
//  create an algorithm to generate matrix of possible combinations instead of hardcoding combinations
const ACTION_COMBO_LAND_USE_COMPATIBILITY_MATRIX = {
  AC32: [
    ['SAM1', 'SAM2'], ['SAM1'], ['SAM2'], ['AB3'], ['SAM1', 'AB3'], ['CSAM1', 'SAM2'], ['CSAM1'], ['CSAM1', 'AB3'],
    ['CSAM2'], ['CSAM2', 'SAM1'], ['CSAM2', 'CSAM1'], ['CSAM2', 'AB3'], ['CSAM2', 'SAM1', 'CSAM1'], ['CSAM2', 'SAM1', 'AB3'], ['CSAM2', 'CSAM1', 'AB3']
  ],
  PG01: [['SAM1', 'SAM3'], ['SAM1', 'LIG1'], ['SAM1', 'GRH1'], ['SAM1'], ['SAM3'], ['LIG1'], ['GRH1'], ['CSAM1', 'SAM3'], ['CSAM1', 'LIG1'], ['CSAM1', 'GRH1'], ['CSAM1']]
}

const createActionLandUseCompatibilityMatrix = () => {
  let allActionCodes = []
  for (const mapKey in ACTION_COMBO_LAND_USE_COMPATIBILITY_MATRIX) {
    allActionCodes = allActionCodes.concat(ACTION_COMBO_LAND_USE_COMPATIBILITY_MATRIX[`${mapKey}`].flatMap(combos => combos))
  }
  const actionLandUseMatrix = {}
  new Set(allActionCodes).forEach((actionCode) => {
    actionLandUseMatrix[actionCode] = []
    for (const mapKey in ACTION_COMBO_LAND_USE_COMPATIBILITY_MATRIX) {
      if (ACTION_COMBO_LAND_USE_COMPATIBILITY_MATRIX[`${mapKey}`].flatMap(combos => combos).includes(actionCode)) {
        actionLandUseMatrix[actionCode].push(mapKey)
      }
    }
  })
  return actionLandUseMatrix
}

module.exports = {
  actionCombinationLandUseCompatibilityMatrix: ACTION_COMBO_LAND_USE_COMPATIBILITY_MATRIX,
  actionLandUseCompatibilityMatrix: createActionLandUseCompatibilityMatrix(),
  updateMatrix (newEntries) {
    applyUpdate(newEntries, this.actionCombinationLandUseCompatibilityMatrix)
  }
}
