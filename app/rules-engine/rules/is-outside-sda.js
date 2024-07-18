function isOutsideSda (application) {
  const { landParcel } = application
  const { tags } = landParcel

  if (tags.includes('is-sda')) {
    return { passed: false, message: 'Land parcel is inside of a Severely Disadvantaged Area' }
  }

  return { passed: true }
}

module.exports = { isOutsideSda }
