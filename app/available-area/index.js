function availableArea (params) {
  if (params == null) {
    return 0.0
  }
  const { applicationFor, landParcel, actionCompatibilityMatrix } = params

  let area = landParcel.area ?? 0.0

  const compatibleAgreements = actionCompatibilityMatrix[applicationFor] ?? []

  for (const agreement of landParcel.existingAgreements ?? []) {
    if (!compatibleAgreements.includes(agreement.code)) {
      area -= agreement.area
    }
  }

  return area
}

module.exports = {
  availableArea
}
