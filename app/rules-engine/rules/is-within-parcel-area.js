const isWithinParcelArea = (application) => {
  const { landParcel: { area } } = application

  const passed = application.areaAppliedFor <= area

  return (!passed)
    ? { passed, message: `Area applied for (${application.areaAppliedFor}ha) is greater than parcel area (${area}ha)` }
    : { passed }
}

module.exports = { isWithinParcelArea }
