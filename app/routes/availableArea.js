const { availableArea } = require('../available-area')
const actionCompatibilityMatrix = require('../available-area/actionCompatibilityMatrix')
const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

module.exports = [
  {
    method: 'POST',
    path: '/availableArea',
    options: {
      payload: {
        parse: false // to allow manual parsing of JSON payload
      }
    },
    handler: (request, h) => {
      let payload
      try {
        const normalisedPayload = normalizePayload(request.payload.toString())
        payload = normalisedPayload
      } catch (error) {
        return h.response(error.message || 'Invalid JSON format').code(BAD_REQUEST_STATUS_CODE)
      }
      const { applicationFor, landParcel } = payload
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

function normalizePayload (payloadString) {
  if (!payloadString.includes('applicationFor') || !payloadString.includes('landParcel')) {
    throw new Error('Missing body parameters')
  }
  if (payloadString.includes('existingAgreements')) {
    const regexForAreaWithMissingValue = /"area":\s*(?=[},])/g
    const regexForCodeWithMissingValue = /"code":\s*(?=[},])/g
    const modifiedPayloadString = payloadString.replace(regexForAreaWithMissingValue, '"area": "_BLANK_"').replace(regexForCodeWithMissingValue, '"code": "_BLANK_"')
    const payload = JSON.parse(modifiedPayloadString)
    if (modifiedPayloadString.includes('_BLANK_')) {
      delete payload.landParcel.existingAgreements // removed invalid existingAgreements
    }
    return payload
  } else {
    return JSON.parse(payloadString)
  }
}
