const { getAction } = require('../land-action')
const Boom = require('@hapi/boom')
const { executeRules } = require('../rules-engine/rulesEngine')
const BAD_REQUEST_STATUS_CODE = 400

const executeRulesHandler = (request, h) => {
  try {
    const application = request.payload
    const action = getAction(application.actionCodeAppliedFor)
    if (!action) {
      return h.response(`Unknown action code: ${application.actionCodeAppliedFor}`).code(BAD_REQUEST_STATUS_CODE)
    }
    const results = executeRules(application, action.eligibilityRules)
    return h.response(results)
  } catch (error) {
    console.error(error)
    return Boom.internal(error)
  }
}

const executeRulesEndpoint = {
  method: 'POST',
  path: '/rule-execution',
  handler: executeRulesHandler,
  options: {
    // validate: {
    //   payload: Joi.object({
    //     actionCodeAppliedFor: Joi.string().required(),
    //     landParcel: Joi.object({
    //       area: Joi.number().required(),
    //       existingAgreements: Joi.array().items(Joi.object({
    //         area: Joi.number().required(),
    //         code: Joi.string().required()
    //       })),
    //       tags: Joi.array().items(Joi.string())
    //     })
    //   })
    // }
  }
}

module.exports = [
  executeRulesEndpoint
]
