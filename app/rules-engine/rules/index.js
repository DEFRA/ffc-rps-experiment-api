const { supplementAreaMatchesParent } = require('./supplement-area-matches-parent')
const { isForWholeParcelArea } = require('./is-for-whole-parcel-area')
const { isBelowMoorlandLine } = require('./is-below-moorland-line')
const { isOutsideSda, hasPeatySoil, noSSI, noHeferFeatures } = require('./tag-based-rules')

const rules = {
  'supplement-area-matches-parent': supplementAreaMatchesParent,
  'is-below-moorland-line': isBelowMoorlandLine,
  'is-for-whole-parcel-area': isForWholeParcelArea,
  'is-outside-sda': isOutsideSda,
  'has-peaty-soil': hasPeatySoil,
  'no-sssi': noSSI,
  'no-hefer-features': noHeferFeatures
}

module.exports = { rules }
