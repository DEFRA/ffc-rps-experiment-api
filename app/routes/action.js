const OK_STATUS_CODE = 200
const BAD_REQUEST_STATUS_CODE = 400

const { actions } = require('../static-data/actions')

module.exports = [
  {
    method: 'GET',
    path: '/action',
    handler: (request, h) => {
      const parcelId = request.query['parcel-id']

      if (!parcelId) {
        return h
          .response('Missing parcel-id query parameter')
          .code(BAD_REQUEST_STATUS_CODE)
      }

      return h.response(actions).code(OK_STATUS_CODE)
    }
  }
]
