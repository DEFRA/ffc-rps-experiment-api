const isLessThanMaximumParcelArea = (application, ruleConfig) => {
  const { landParcel: { area } } = application

  const passed = area < ruleConfig.maxArea

  return (!passed)
    ? { passed, message: `The parcel must have a maximum total area of ${ruleConfig.maxArea}ha` }
    : { passed }
}

module.exports = { isLessThanMaximumParcelArea }
