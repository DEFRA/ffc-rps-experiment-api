const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400
const { actions } = require('../static-data/actions')
const { actionLandUseCompatibilityMatrix } = require('../available-area/action-land-use-compatibility-matrix')
const Joi = require('joi')
const { actionCombinationLandUseCompatibilityMatrix } = require('../available-area/action-combination-land-use-compatibility-matrix')

const isValidCombination = (actions, landUseCodes) => {
  for (const code of landUseCodes) {
    const allowedCombinations = actionCombinationLandUseCompatibilityMatrix[code] || []
    let validForThisCode = false

    for (const combination of allowedCombinations) {
      if (actions.every(action => combination.includes(action))) {
        validForThisCode = true
        break // Found a valid combination, no need to check further for this code
      }
    }
    if (!validForThisCode) {
      // No valid combination found for this land use code
      return { isValid: false, invalidCombination: `No valid combination for land use code: ${code}` }
    }
  }
  return { isValid: true } // All land use codes have at least one valid combination
}

module.exports = [
  {
    method: 'POST',
    path: '/action-validation',
    options: {
      validate: {
        payload: Joi.object().custom((value, helper) => {
          console.log('Validating payload:', value)
          if (!Array.isArray(value.actions)) {
            return helper.error('Invalid payload structure: actions must be an array')
          }
          const validationResult = isValidCombination(value.actions, value.landUseCodes)
          const result = validationResult.isValid ? value : helper.error(`Invalid combination of actions: ${validationResult.invalidCombination}`)
          return result
        }),
        failAction: async (request, h, error) => {
          console.log('Endpoint /action-validation hit with request:', request.payload, 'and error:', error)
          const response = { isValidCombination: false, error: error.message }
          return h.response(JSON.stringify(response)).code(BAD_REQUEST_STATUS_CODE).takeover()
        }
      }
    },
    handler: (request, h) => {
      console.log('Endpoint /action-validation hit with request:', request.payload, 'and is valid')
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

      function filterActions (actions, landUseCodes, matrix) {
        if (!Array.isArray(landUseCodes)) {
          throw new TypeError('landUseCodes must be an array')
        }

        return actions.filter(action => {
          console.log('Processing action:', action.code)
          const compatibleLandUses = matrix[action.code] || []
          console.log('Compatible land uses for action:', action.code, 'are:', compatibleLandUses)

          // Check for intersection without using `some`
          const matchingCodes = landUseCodes.filter(code => compatibleLandUses.includes(code))
          console.log('Matching codes for action:', action.code, 'are:', matchingCodes)

          return matchingCodes.length > 0
        })
      }

      const filteredActions = filterActions(actions, landUseCodes, actionLandUseCompatibilityMatrix)
      console.log('FILTERED-ACTIONS:', filteredActions)

      // Return the filtered actions instead of the unfiltered ones
      return h.response(filteredActions).code(OK_STATUS_CODE)
    }
  }
]
