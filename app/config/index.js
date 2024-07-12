const Joi = require('joi')

const schema = Joi.object({
  env: Joi.string().valid('development', 'test', 'production').default('development'),
  crmApiBaseUri: Joi.string().uri().default('https://changeme'),
  crmApiUsername: Joi.string().default('changeme'),
  crmApiPwd: Joi.string().default('changeme')
})

const config = {
  env: process.env.NODE_ENV,
  crmApiBaseUri: process.env.CRM_API_BASE_URI,
  crmApiUsername: process.env.CRM_API_USERNAME,
  crmApiPwd: process.env.CRM_API_PWD
}

const configValidationResult = schema.validate(config, { abortEarly: false })

if (configValidationResult.error) {
  throw new Error(`The server config is invalid. ${configValidationResult.error.message}`)
}

module.exports = configValidationResult.value
