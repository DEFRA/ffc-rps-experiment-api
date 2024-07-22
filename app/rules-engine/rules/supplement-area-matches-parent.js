function supplementAreaMatchesParent (application, config) {
  const { actions } = config
  const { areaAppliedFor, actionCodeAppliedFor, landParcel: { existingAgreements } } = application

  const supplementForCode = actions[actionCodeAppliedFor]?.supplementFor

  console.log(application)
  const existingAgreement = existingAgreements.find(
    (agreement) => agreement.code === supplementForCode
  )

  if (!existingAgreement) {
    return { passed: false, message: `Action code ${actionCodeAppliedFor} requires an existing agreement for ${supplementForCode}` }
  }

  if (existingAgreement.area !== areaAppliedFor) {
    return { passed: false, message: `Application is for ${actionCodeAppliedFor} with an area of ${areaAppliedFor}ha, the action ${supplementForCode} is present but for an area of ${existingAgreement.area}ha. These areas should match.` }
  }

  return { passed: true }
}

module.exports = { supplementAreaMatchesParent }
