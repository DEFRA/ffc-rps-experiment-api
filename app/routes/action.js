const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400
const { actions } = require('../static-data/actions')
const { actionLandUseCompatibilityMatrix, actionCombinationLandUseCompatibilityMatrix } = require('../available-area/action-land-use-compatibility-matrix')
const Joi = require('joi')

const { executeApplicableRules } = require('../rules-engine/rulesEngine')

const getActionsForLandUses = (landUseCodes) => {
  if (!Array.isArray(landUseCodes)) {
    throw new TypeError('landUseCodes must be an array')
  }
  return actions.filter(action => {
    const compatibleLandUses = actionLandUseCompatibilityMatrix[action.code] || []
    return landUseCodes.some(code => compatibleLandUses.includes(code))
  })
}

const isValidCombination = (actions, landUseCodes) => {
  const actionCodes = actions.map((action) => action.actionCode)
  for (const code of landUseCodes) {
    const allowedCombinations = actionCombinationLandUseCompatibilityMatrix[code] || []
    let validForThisCode = false
    for (const combination of allowedCombinations) {
      if (actionCodes.every(actionCode => combination.includes(actionCode))) {
        validForThisCode = true
        break
      }
    }
    if (!validForThisCode) {
      return { isValid: false, invalidCombination: `The selected combination of actions are invalid for land use code: ${code}` }
    }
  }
  return { isValid: true }
}

const executeActionRules = (actions, landParcel) => {
  return actions.map(action => {
    const application = {
      areaAppliedFor: parseFloat(action.quantity),
      actionCodeAppliedFor: action.actionCode,
      landParcel: {
        area: parseFloat(landParcel.area),
        moorlandLineStatus: landParcel.moorlandLineStatus,
        existingAgreements: []
      }
    }
    return { action: action.actionCode, ...executeApplicableRules(application) }
  })
}

module.exports = [
  {
    method: 'POST',
    path: '/action-validation',
    options: {
      validate: {
        payload: Joi.object().custom((value, helper) => {
          if (!Array.isArray(value.actions)) {
            return helper.message({ 'any.custom': 'Invalid payload structure: actions must be an array' })
          }

          const actionCompatibilityValidationResult = isValidCombination(value.actions, value.landParcel.landUseCodes)
          if (!actionCompatibilityValidationResult.isValid) {
            return helper.message(actionCompatibilityValidationResult.invalidCombination)
          }

          const ruleResults = executeActionRules(value.actions, value.landParcel)
          const ruleFailureMessages = []
          for (const result of ruleResults) {
            if (!result.passed) {
              ruleFailureMessages.push(`${result.action}: ${result.results.filter(r => !r.passed).map(r => r.message).join(', ')}`)
            }
          }
          if (ruleFailureMessages.length) {
            return helper.message(ruleFailureMessages.join(', '))
          }
          return value
        }),
        failAction: async (request, h, error) => {
          const response = { isValidCombination: false, error: error.details[0].message }
          return h.response(JSON.stringify(response)).code(BAD_REQUEST_STATUS_CODE).takeover()
        }
      }
    },
    handler: (request, h) => {
      const response = { isValidCombination: true, message: 'Action combination valid' }
      return h.response(JSON.stringify((response))).code(OK_STATUS_CODE)
    }
  },
  {
    method: 'GET',
    path: '/action',
    handler: (request, h) => {
      const parcelId = request.query['parcel-id']
      const landUseCodesString = request.query['land-use-codes']
      const landUseCodes = landUseCodesString ? landUseCodesString.split(',') : []
      if (!parcelId) {
        return h
          .response('Missing parcel-id query parameter')
          .code(BAD_REQUEST_STATUS_CODE)
      }
      const filteredActions = getActionsForLandUses(landUseCodes)
      return h.response(filteredActions).code(OK_STATUS_CODE)
    }
  }
]
