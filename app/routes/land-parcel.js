const Joi = require('joi')
const { getLandParcels } = require('../land-parcel')

const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

module.exports = [
  {
    method: 'GET',
    path: '/land-parcel/{sbi}',
    options: {
      validate: {
        params: Joi.object({
          sbi: Joi.number().integer().min(1)
        })
      }
    },
    handler: (request, h) => {
      try {
        const landParcels = getLandParcels(request.params.sbi)
        return landParcels?.length
          ? h.response(landParcels).code(OK_STATUS_CODE)
          : h.response('No land parcels found for the provided SBI').code(404)
      } catch (error) {
        return h.response({ message: error.message }).code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
