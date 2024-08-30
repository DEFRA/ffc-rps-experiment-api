const Joi = require('joi')
const { getLandParcels } = require('../land-parcel')
const { getLandParcelsBySbi } = require('../land-parcel/land-parcel-repository')

const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400
const NOT_FOUND_STATUS_CODE = 404

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
          : h.response('No land parcels found for the provided sbi').code(NOT_FOUND_STATUS_CODE)
      } catch (error) {
        return h.response({ message: error.message }).code(BAD_REQUEST_STATUS_CODE)
      }
    }
  },
  {
    method: 'GET',
    path: '/land-parcel/v2/{sbi}',
    options: {
      validate: {
        params: Joi.object({
          sbi: Joi.number().integer().min(1)
        })
      }
    },
    handler: async (request, h) => {
      try {
        const { sbi } = request.params
        const landParcels = await getLandParcelsBySbi(sbi)
        return landParcels.length
          ? h.response(landParcels).code(OK_STATUS_CODE)
          : h.response('No land parcels found for the provided sbi').code(NOT_FOUND_STATUS_CODE)
      } catch (error) {
        console.error('Error fetching land parcels:', error)
        return h.response({ message: error.message }).code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
