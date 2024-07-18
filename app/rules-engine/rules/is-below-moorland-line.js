function isBelowMoorlandLine (config, application) {
  const moorlandLineStatus = application.landParcel.moorlandLineStatus

  if (!moorlandLineStatus === 'below') {
    return { passed: false, message: 'Land parcel is above the moorland line' }
  }

  return { passed: true }
}

module.exports = { isBelowMoorlandLine }
