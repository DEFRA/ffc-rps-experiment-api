const Joi = require('joi')
const { actions } = require('../static-data/actions')
const { actionCombinationLandUseCompatibilityMatrix } = require('../available-area/action-combination-land-use-compatibility-matrix')

const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

const isValidCombination = (actions, landUseCodes) => {
  for (const code of landUseCodes) {
    const allowedCombinations = actionCombinationLandUseCompatibilityMatrix[code] || [];
    for (const combination of allowedCombinations) {
      if (combination.length === actions.length && combination.every(action => actions.includes(action))) {
        return true
      }
    }
  }
  return false
}

module.exports = [
  {
    method: 'POST',
    path: '/payment',
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

        if (!isValidCombination(actionCodes, request.payload['land-use-codes'])) {
          console.error('Invalid combination of actions for given land use codes')
          return h.response({ message: 'Invalid combination of actions for given land use codes' }).code(BAD_REQUEST_STATUS_CODE)
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
