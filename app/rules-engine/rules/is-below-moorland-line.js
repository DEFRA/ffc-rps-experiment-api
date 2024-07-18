function isBelowMoorlandLine (config, application) {
  const moorlandLineStatus = application.landParcel.moorlandLineStatus
  return { passed: moorlandLineStatus === 'below' }
}

module.exports = { isBelowMoorlandLine }
