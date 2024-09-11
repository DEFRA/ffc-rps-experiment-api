function supplementAreaMatchesParent (application, config) {
  const { areaAppliedFor, actionCodeAppliedFor, landParcel: { existingAgreements } } = application

  const existingBaseAgreements = existingAgreements.filter(
    (agreement) => config.baseActions.includes(agreement.code)
  )

  if (!existingBaseAgreements.length) {
    return { passed: false, message: `Action code ${actionCodeAppliedFor} requires an existing agreement with any of: ${config.baseActions.join(', ')}` }
  }

  const mismatchedAreaBaseAgreements = existingBaseAgreements
    .filter((existingAgreement) => existingAgreement.area !== areaAppliedFor)
  if (mismatchedAreaBaseAgreements.length) {
    const formattedExistingAgreements = mismatchedAreaBaseAgreements
      .map(agreement => `${agreement.code} (${agreement.area}ha)`)
      .join(', ')
    return { passed: false, message: `Application is for ${actionCodeAppliedFor} with an area of ${areaAppliedFor}ha, the base action(s) ${formattedExistingAgreements} is/are present. These areas should match.` }
  }

  return { passed: true }
}

module.exports = { supplementAreaMatchesParent }
