const OK_STATUS_CODE = 200

module.exports = {
  method: 'GET',
  path: '/healthy',
  handler: (h) => {
    return h.response('ok').code(OK_STATUS_CODE)
  }
}
