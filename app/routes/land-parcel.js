const Joi = require('joi')
const { getLandParcelsFromDb } = require('../land-parcel')

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
    handler: async (request, h) => {
      try {
        const { sbi } = request.params
        console.log('Fetching land parcels for SBI:', sbi)
        const landParcels = await getLandParcelsFromDb(sbi)
        console.log('Land parcels returned from DB:', landParcels)
        return landParcels && landParcels.length > 0
          ? h.response(landParcels).code(OK_STATUS_CODE)
          : h.response('No land parcels found for the provided sbi').code(NOT_FOUND_STATUS_CODE)
      } catch (error) {
        console.error('Error fetching land parcels:', error)
        return h.response({ message: error.message }).code(BAD_REQUEST_STATUS_CODE)
      }
    }
  }
]
