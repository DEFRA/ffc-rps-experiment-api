const OK_STATUS_CODE = 200

module.exports = {
  method: 'GET',
  path: '/eligibility',
  handler: (_request, h) => {
    return h.response(true).code(OK_STATUS_CODE)
  }
}
