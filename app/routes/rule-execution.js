const Boom = require('@hapi/boom')
const Joi = require('joi')
const { executeApplicableRules } = require('../rules-engine/rulesEngine')

const executeRulesHandler = (request, h) => {
  try {
    const application = request.payload
    const results = executeApplicableRules(application)
    return h.response(results)
  } catch (error) {
    console.error(error)
    return Boom.badRequest()
  }
}

const executeRulesEndpoint = {
  method: 'POST',
  path: '/rule-execution',
  handler: executeRulesHandler,
  options: {
    validate: {
      payload: Joi.object({
        actionCodeAppliedFor: Joi.string().required(),
        landParcel: Joi.object({
          area: Joi.number().required(),
          existingAgreements: Joi.array().items(Joi.object({
            area: Joi.number().required(),
            code: Joi.string().required()
          })),
          tags: Joi.array().items(Joi.string())
        })
      })
    }
  }
}

module.exports = [
  executeRulesEndpoint
]
