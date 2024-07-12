require('./insights').setup()
const Hapi = require('@hapi/hapi')

const server = Hapi.server({
  port: process.env.PORT
})
const routes = [].concat(
  require('./routes/healthy'),
  require('./routes/healthz'),
  require('./routes/eligibility'),
  require('./routes/available-area'),
  require('./routes/action'),
  require('./routes/land-parcel'),
  require('./routes/payment'),
  require('./routes/fraud'),
  require('./routes/funding-application')
)

server.route(routes)

module.exports = server
