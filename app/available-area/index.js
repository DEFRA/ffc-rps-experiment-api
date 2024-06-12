function isCompatibleWithAllCodes(
  actionCompatibilityMatrix,
  newCode,
  existingCodes
) {
  const compatibleCodes = existingCodes.filter((code) =>
    actionCompatibilityMatrix[code].includes(newCode)
  )
  return compatibleCodes.length === existingCodes.length
}

function availableArea(params) {
  if (params == null) {
    return 0.0
  }

  const { applicationFor, landParcel, actionCompatibilityMatrix } = params

  console.log('landParcel', landParcel)
  console.log('applicationFor', applicationFor)

  let area = landParcel.area ?? 0.0

  const compatibleAgreementGroups = []

  for (const agreement of landParcel.existingAgreements ?? []) {
    if (compatibleAgreementGroups.length === 0) {
      const group = { area: agreement.area, codes: [agreement.code] }
      compatibleAgreementGroups.push(group)
      console.log('NEW GROUP - EMPTY', group)
      continue
    }

    const compatibleGroup = compatibleAgreementGroups.find((group) =>
      isCompatibleWithAllCodes(
        actionCompatibilityMatrix,
        agreement.code,
        group.codes
      )
    )

    if (compatibleGroup) {
      console.log('ADD TO GROUP')
      if (agreement.area === compatibleGroup.area) {
        console.log('FITS IN GROUP')
        compatibleGroup.codes.push(agreement.code)
      } else if (agreement.area < compatibleGroup.area) {
        console.log('FITS IN GROUP, SPLITTING')
        compatibleGroup.area -= agreement.area
        compatibleAgreementGroups.push({
          area: agreement.area,
          codes: [...compatibleGroup.codes, agreement.code]
        })
      } else if (agreement.area > compatibleGroup.area) {
        console.log('DOES NOT FIT IN GROUP, SPLITTING')
        compatibleGroup.codes.push(agreement.code)
        compatibleAgreementGroups.push({
          area: agreement.area - compatibleGroup.area,
          codes: [agreement.code]
        })
      }
    } else {
      compatibleAgreementGroups.push({
        area: agreement.area,
        codes: [agreement.code]
      })
      console.log('NEW GROUP - NO COMPATIBLE GROUPS FOUND', {
        area: agreement.area,
        codes: [agreement.code]
      })
    }

    console.log('compatibleAgreementGroups', compatibleAgreementGroups)
  }

  for (const group of compatibleAgreementGroups ?? []) {
    if (
      !isCompatibleWithAllCodes(
        actionCompatibilityMatrix,
        applicationFor,
        group.codes
      )
    ) {
      area -= group.area
    }
  }

  return area
}

module.exports = {
  availableArea
}
