const Joi = require('joi')
const { getAction } = require('../land-action')
const { actionCompatibilityMatrix } = require('../available-area/action-compatibility-matrix')
const OK_STATUS_CODE = 200
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500
const NOT_FOUND_STATUS_CODE = 404

module.exports = [
  {
    method: 'POST',
    path: '/payment-calculation',
    options: {
      validate: {
        payload: Joi.object({
          actions: Joi.array().items(
            Joi.object({
              'action-code': Joi.string().required(),
              'hectares-applied-for': Joi.number().required()
            })
          ).required(),
          'land-use-codes': Joi.array().items(Joi.string()).required()
        })
      }
    },
    handler: (request, h) => {
      try {
        const actionCodes = request.payload.actions.map(action => action['action-code'])
        const actionsMissing = actionCodes.some(action => !actionCompatibilityMatrix[action])
        if (actionsMissing) {
          return h.response({ message: 'No action codes found for: ', actionCodes }).code(NOT_FOUND_STATUS_CODE)
        }
        const payments = request.payload.actions.map(actionRequest => {
          const actionCode = actionRequest['action-code']
          const action = getAction(actionCode)
          const hectaresAppliedFor = parseFloat(actionRequest['hectares-applied-for'] ?? 0)
          const paymentAmount = (hectaresAppliedFor * action.payment.amountPerHectare) + (action.payment.additionalPaymentPerAgreement ?? 0)
          return {
            'action-code': actionCode,
            payment: paymentAmount
          }
        })

        return h.response(payments).code(OK_STATUS_CODE)
      } catch (error) {
        console.error('Error processing request:', error)
        return h.response({ message: error.message }).code(INTERNAL_SERVER_ERROR_STATUS_CODE)
      }
    }
  }
]
