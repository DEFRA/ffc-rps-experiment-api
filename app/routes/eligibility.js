module.exports = {
  method: 'GET',
  path: '/eligibility',
  handler: (request, h) => {
    return h.response(true).code(200)
  }
}
