const Joi = require('joi')
const { actions } = require('../static-data/actions')
const actionCompatibilityMatrix = require('../available-area/action-compatibility-matrix')
const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400
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
        const actionsMissing = actionCodes.some(action => !Object.prototype.hasOwnProperty.call(actionCompatibilityMatrix.actionCompatibilityMatrix, action))
        if (actionsMissing) {
          return h.response({ message: 'No action codes found for: ', actionCodes }).code(NOT_FOUND_STATUS_CODE)
        }
        const payments = request.payload.actions.map(actionRequest => {
          const action = actions.find(a => a.code === actionRequest['action-code'])

          if (!action) {
            console.log(`No action found for code ${actionRequest['action-code']}`)
            return {
              'action-code': actionRequest['action-code'],
              error: `No action found for code ${actionRequest['action-code']}`
            }
          }

          const hectaresAppliedFor = parseFloat(actionRequest['hectares-applied-for'] ?? 0)
          const paymentAmount = hectaresAppliedFor * action.payment.amountPerHectare
          return {
            'action-code': actionRequest['action-code'],
            payment: paymentAmount
          }
        })

        return h.response(payments).code(OK_STATUS_CODE)
      } catch (error) {
        console.error('Error processing request:', error)
        return h.response({ message: error.message }).code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
