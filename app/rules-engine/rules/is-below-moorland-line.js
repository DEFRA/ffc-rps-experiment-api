function isBelowMoorlandLine (application) {
  if (application?.landParcel?.moorlandLineStatus !== 'below') {
    return { passed: false, message: 'Land parcel is above the moorland line' }
  }

  return { passed: true }
}

module.exports = { isBelowMoorlandLine }
