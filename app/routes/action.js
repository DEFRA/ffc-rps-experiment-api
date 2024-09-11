const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

const { getActions, getAction, addRule, updateRule, deleteRule } = require('../land-action')
const { actionLandUseCompatibilityMatrix, actionCombinationLandUseCompatibilityMatrix } = require('../available-area/action-land-use-compatibility-matrix')
const Joi = require('joi')
const { executeRules } = require('../rules-engine/rulesEngine')

const getActionsForLandUses = (landUseCodes) => {
  if (!Array.isArray(landUseCodes)) {
    throw new TypeError('landUseCodes must be an array')
  }
  const actions = getActions()
  return actions.filter(action => {
    const compatibleLandUses = actionLandUseCompatibilityMatrix[action.code] || []
    return landUseCodes.some(code => compatibleLandUses.includes(code))
  })
}

const isValidCombination = (preexistingActions = [], userSelectedActions, landUseCodes) => {
  const actionCodes = userSelectedActions.concat(preexistingActions).map((action) => action.actionCode)
  for (const code of landUseCodes) {
    const allowedCombinations = actionCombinationLandUseCompatibilityMatrix[code] || []
    let validForThisCode = false
    for (const combination of allowedCombinations) {
      if (actionCodes.every(actionCode => combination.includes(actionCode))) {
        validForThisCode = true
        break
      }
    }
    if (!validForThisCode) {
      if (preexistingActions.length > 0) {
        const actionCodesString = preexistingActions.map(action => action.actionCode).join(', ')
        return { isValid: false, invalidCombination: `The selected combination of actions, along with your pre-existing actions (${actionCodesString}), is invalid for land use code ${code}` }
      }
      return { isValid: false, invalidCombination: `The selected combination of actions are invalid for land use code: ${code}` }
    }
  }
  return { isValid: true }
}

const executeActionRules = (userSelectedActions, landParcel) => {
  return userSelectedActions.map(action => {
    const application = {
      areaAppliedFor: parseFloat(action.quantity),
      actionCodeAppliedFor: action.actionCode,
      landParcel: {
        area: parseFloat(landParcel.area),
        moorlandLineStatus: landParcel.moorlandLineStatus,
        existingAgreements: []
      }
    }
    const userSelectedAction = getAction(action.actionCode)
    return { action: action.actionCode, ...executeRules(application, userSelectedAction.eligibilityRules) }
  })
}

const commonHandler = (request, h, callback) => {
  const actionCode = request.params.actionCode
  const action = getAction(actionCode)
  if (!action) {
    return h.response({ error: 'Action not found' }).code(BAD_REQUEST_STATUS_CODE)
  }
  return callback(action, request, h)
}

const actionRulePath = '/action/{actionCode}/rule/'
module.exports = [
  {
    method: 'POST',
    path: '/action-validation',
    options: {
      validate: {
        payload: Joi.object().custom((value, helper) => {
          if (!Array.isArray(value.actions)) {
            return helper.message({ 'any.custom': 'Invalid payload structure: actions must be an array' })
          }
          const actionCompatibilityValidationResult = isValidCombination(value.landParcel.agreements, value.actions, value.landParcel.landUseCodes)
          if (!actionCompatibilityValidationResult.isValid) {
            return helper.message(actionCompatibilityValidationResult.invalidCombination)
          }

          const ruleResults = executeActionRules(value.actions, value.landParcel)
          const ruleFailureMessages = []
          for (const result of ruleResults) {
            if (!result.passed) {
              ruleFailureMessages.push(`${result.action}: ${result.results.filter(r => !r.passed).map(r => r.message).join(', ')}`)
            }
          }
          if (ruleFailureMessages.length) {
            return helper.message(ruleFailureMessages.join(', '))
          }
          return value
        }),
        failAction: async (_request, h, error) => {
          const response = { isValidCombination: false, error: error.details[0].message }
          return h.response(JSON.stringify(response)).code(BAD_REQUEST_STATUS_CODE).takeover()
        }
      }
    },
    handler: (_request, h) => {
      const response = { isValidCombination: true, message: 'Action combination valid' }
      return h.response(JSON.stringify((response))).code(OK_STATUS_CODE)
    }
  },
  {
    method: 'GET',
    path: '/action',
    handler: (request, h) => {
      const parcelId = request.query['parcel-id']
      const landUseCodesString = request.query['land-use-codes']
      const preexistingActions = request.query['preexisting-actions'] ? request.query['preexisting-actions'].split(',') : []
      const landUseCodes = landUseCodesString ? landUseCodesString.split(',') : []
      if (!parcelId) {
        return h
          .response('Missing parcel-id query parameter')
          .code(BAD_REQUEST_STATUS_CODE)
      }
      const filteredActions = getActionsForLandUses(landUseCodes)
        .filter(action => !preexistingActions.includes(action.code))
        .map((action) => {
          return {
            code: action.code,
            description: action.description,
            payment: action.payment
          }
        })
      return h.response(filteredActions).code(OK_STATUS_CODE)
    }
  },
  {
    method: 'POST',
    path: actionRulePath,
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string().required(),
          config: Joi.object().optional()
        })
      }
    },
    handler: (request, h) => commonHandler(request, h, (action, req, h) => {
      const newRule = req.payload
      addRule(action, newRule)
      return h.response({ message: 'Rule added successfully' }).code(OK_STATUS_CODE)
    })
  },
  {
    method: 'PUT',
    path: actionRulePath,
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string().required(),
          config: Joi.object().optional()
        })
      }
    },
    handler: (request, h) => commonHandler(request, h, (action, req, h) => {
      const ruleToUpdate = req.payload
      const updateSuccessful = updateRule(action, ruleToUpdate)
      if (!updateSuccessful) {
        return h.response({ error: 'Rule not found' }).code(BAD_REQUEST_STATUS_CODE)
      }
      return h.response({ message: 'Rule updated successfully' }).code(OK_STATUS_CODE)
    })
  },
  {
    method: 'DELETE',
    path: actionRulePath,
    options: {
      validate: {
        payload: Joi.object({
          id: Joi.string().required()
        })
      }
    },
    handler: (request, h) => commonHandler(request, h, (action, req, h) => {
      const { id } = req.payload
      const deleteSuccessful = deleteRule(action, id)
      if (!deleteSuccessful) {
        return h.response({ error: 'Rule not found' }).code(BAD_REQUEST_STATUS_CODE)
      }
      return h.response({ message: 'Rule deleted successfully' }).code(OK_STATUS_CODE)
    })
  }
]
