function isForWholeParcelArea (application) {
  const { areaAppliedFor, landParcel: { area } } = application

  const passed = areaAppliedFor === area

  if (!passed) {
    return { passed, message: `Area applied for (${areaAppliedFor}ha) does not match parcel area (${area}ha)` }
  }

  return { passed: true }
}

module.exports = { isForWholeParcelArea }
