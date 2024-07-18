const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400
const { actions } = require('../static-data/actions')
const { actionLandUseCompatibilityMatrix } = require('../available-area/action-land-use-compatibility-matrix')

module.exports = [
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
