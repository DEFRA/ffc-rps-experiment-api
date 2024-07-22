function createNoTagRule (tag, message = `Application shouldn't have tag ${tag}`) {
  return function doesntHaveTag (application) {
    if (application?.landParcel?.tags?.includes(tag)) {
      return { passed: false, message }
    }

    return { passed: true }
  }
}

const isOutsideSda = createNoTagRule('is-sda', 'Land parcel is inside of a Severely Disadvantaged Area')
const hasPeatySoil = createNoTagRule('has-peaty-soil', 'Land parcel has peaty soil')
const noSSI = createNoTagRule('has-sssi', 'Land parcel has Site of Special Scientific Interest')
const noHeferFeatures = createNoTagRule('has-hefer-feature', 'Land parcel has archeological features')

module.exports = { isOutsideSda, hasPeatySoil, noSSI, noHeferFeatures }
