const hasMinimumParcelArea = (application, ruleConfig) => {
  const { landParcel: { area } } = application

  const passed = area >= ruleConfig.minArea

  return (!passed)
    ? { passed, message: `The parcel must have a total area of at least ${ruleConfig.minArea}ha` }
    : { passed }
}

module.exports = { hasMinimumParcelArea }
