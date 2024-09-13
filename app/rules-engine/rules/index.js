const { supplementAreaMatchesParent } = require('./supplement-area-matches-parent')
const { isForWholeParcelArea } = require('./is-for-whole-parcel-area')
const { isBelowMoorlandLine } = require('./is-below-moorland-line')
const { hasMinimumParcelArea } = require('./has-min-parcel-area')
const { isLessThanMaximumParcelArea } = require('./is-less-than-max-parcel-area')
const { isOutsideSda, hasPeatySoil, noSSI, noHeferFeatures } = require('./tag-based-rules')

const rules = {
  'supplement-area-matches-parent': supplementAreaMatchesParent,
  'is-below-moorland-line': isBelowMoorlandLine,
  'is-for-whole-parcel-area': isForWholeParcelArea,
  'has-min-parcel-area': hasMinimumParcelArea,
  'is-less-than-max-parcel-area': isLessThanMaximumParcelArea,
  'is-outside-sda': isOutsideSda,
  'has-peaty-soil': hasPeatySoil,
  'no-sssi': noSSI,
  'no-hefer-features': noHeferFeatures
}

module.exports = { rules }
