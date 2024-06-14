const { availableArea } = require('../available-area')
const actionCompatibilityMatrix = require('../available-area/action-compatibility-matrix')
const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

module.exports = [
  {
    method: 'POST',
    path: '/available-area',
    handler: (request, h) => {
      const { applicationFor, landParcel } = request.payload

      if (!applicationFor || !landParcel) {
        return h.response('Missing body parameters').code(BAD_REQUEST_STATUS_CODE)
      }

      if (landParcel?.existingAgreements?.length && landParcel.existingAgreements.some(agreement => agreement.code == null || agreement.area == null)) {
        return h.response('Invalid existing agreement').code(BAD_REQUEST_STATUS_CODE)
      }

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
    path: '/available-area/matrix',
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
