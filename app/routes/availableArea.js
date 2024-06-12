const { availableArea } = require('../available-area')
const actionCompatibilityMatrix = require('../available-area/actionCompatibilityMatrix')
const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

module.exports = [
  {
    method: 'POST',
    path: '/availableArea',
    handler: (request, h) => {
      const { applicationFor, landParcel } = request.payload

      if (!applicationFor || !landParcel) {
        return h.response('Missing body parameters').code(BAD_REQUEST_STATUS_CODE)
      }

      landParcel.existingAgreements = Array.isArray(landParcel.existingAgreements)
        ? landParcel.existingAgreements.map(agreement => ({
          code: agreement.code || 'NA',
          area: agreement.area || 0
        }))
        : []

      const result = availableArea({
        applicationFor,
        landParcel,
        actionCompatibilityMatrix: actionCompatibilityMatrix.actionCompatibilityMatrix
      })

      return h.response(result).code(OK_STATUS_CODE)
    }
  },
  {
    method: 'PATCH',
    path: '/availableArea/matrix',
    handler: (request, h) => {
      const newEntries = request.payload
      try {
        actionCompatibilityMatrix.updateMatrix(newEntries)
        return h.response({ message: 'Matrix updated successfully', matrix: actionCompatibilityMatrix.actionCompatibilityMatrix }).code(OK_STATUS_CODE)
      } catch (error) {
        return h.response({ message: error.message }).code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
