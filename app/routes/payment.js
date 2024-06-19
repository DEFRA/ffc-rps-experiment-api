const Joi = require('joi')
const { actions } = require('../static-data/actions')

const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

module.exports = [
  {
    method: 'GET',
    path: '/payment',
    options: {
      validate: {
        query: Joi.object({
          'action-code': Joi.string().required(),
          'hectares-applied-for': Joi.number().required()
        })
      }
    },
    handler: (request, h) => {
      try {
        const action = actions.find(
          (action) => action.code === request.query['action-code']
        )

        if (!action) {
          return h
            .response(
              `No action found for code ${request.query['action-code']}`
            )
            .code(404)
        }

        const hectaresAppliedFor = parseFloat(
          request.query['hectares-applied-for'] ?? 0
        )

        return h
          .response(hectaresAppliedFor * action.payment.amountPerHectare)
          .code(OK_STATUS_CODE)
      } catch (error) {
        return h
          .response({ message: error.message })
          .code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
