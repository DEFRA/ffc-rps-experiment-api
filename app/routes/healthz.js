const OK_STATUS_CODE = 200

module.exports = {
  method: 'GET',
  path: '/healthz',
  handler: (_request, h) => {
    return h.response('ok').code(OK_STATUS_CODE)
  }
}
