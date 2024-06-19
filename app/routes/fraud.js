const Joi = require('joi')

const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400
const NOT_FOUND_STATUS_CODE = 404

module.exports = [
  {
    method: 'GET',
    path: '/fraud/{sbi}',
    options: {
      validate: {
        params: Joi.object({
          sbi: Joi.string().required()
        })
      }
    },
    handler: (request, h) => {
      try {
        if (request.params.sbi === '200599768') {
          return h.response({ isFlaggedForFraud: true }).code(OK_STATUS_CODE)
        }

        if (request.params.sbi === '106846848') {
          return h.response({ isFlaggedForFraud: false }).code(OK_STATUS_CODE)
        }

        return h
          .response({
            message: `No businesses found with SBI ${request.params.sbi}`
          })
          .code(NOT_FOUND_STATUS_CODE)
      } catch (error) {
        return h
          .response({ message: error.message })
          .code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
