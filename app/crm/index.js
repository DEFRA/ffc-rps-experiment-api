const config = require('../config')
const recordApplication = async (fundingApplication) => {
  const loginResponse = await fetch(`${config.crmApiBaseUri}?method=login&input_type=JSON&response_type=JSON&rest_data={"user_auth":{"user_name":"${config.crmApiUsername}","password":"${config.crmApiPwd}"}}`, { method: 'POST' })
  const deserialisedLoginResponse = await loginResponse.json()
  const sessionId = deserialisedLoginResponse.id
  const formattedActions = fundingApplication.landActions.map((la) => {
    return `${la.actionCode} - ${la.description} (${la.quantity}ha)`
  })
  const serialisedActions = formattedActions.join(', ')
  const response = await fetch(
    `${config.crmApiBaseUri}?method=set_entry&input_type=JSON&response_type=JSON&rest_data={"session":"${sessionId}","module_name":"fcrps_Application_Management","name_value_list":{"name":"${fundingApplication.applicantName}","sbi":"${fundingApplication.sbi}","land_parcel_id":"${fundingApplication.landParcelRef}","payment_amount":${fundingApplication.paymentAmount},"land_action":"${serialisedActions}", "scheme": "${fundingApplication.scheme}"}}`,
    { method: 'POST' })
  return response.json()
}

module.exports = {
  recordApplication
}
