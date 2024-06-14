const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

module.exports = [
  {
    method: 'GET',
    path: '/action',
    handler: (request, h) => {
      const parcelId = request.query['parcel-id']

      if (!parcelId) {
        return h.response('Missing parcel-id query parameter').code(BAD_REQUEST_STATUS_CODE)
      }

      return h.response({
        code: 'AB4',
        description: 'Management of cover crops',
        eligibleLandUses: [
          'Arable land',
          'LAND_USE_CODE_HERE'
        ],
        payment: {
          amountPerHectare: 100.00
        }
      }).code(OK_STATUS_CODE)
    }
  }
]
