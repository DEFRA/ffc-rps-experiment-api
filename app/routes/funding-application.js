const { recordApplication } = require('../crm')
const OK_STATUS_CODE = 200
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500

module.exports = [
  {
    method: 'POST',
    path: '/funding-application',
    options: {
      auth: false
    },
    handler: async (request, h) => {
      try {
        const recordedApplication = await recordApplication(request.payload)
        return h.response({ id: recordedApplication.id }).code(OK_STATUS_CODE)
      } catch (error) {
        console.error(error)
        return h
          .response({ message: error.message })
          .code(INTERNAL_SERVER_ERROR_STATUS_CODE)
      }
    }
  }
]
