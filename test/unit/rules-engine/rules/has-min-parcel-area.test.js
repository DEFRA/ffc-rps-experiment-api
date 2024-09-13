const { rules } = require('../../../../app/rules-engine/rules')

const passTestCases = [
  { landParcelArea: 2, minimumArea: 2 },
  { landParcelArea: 3, minimumArea: 2 }
]

describe('has-min-parcel-area', function () {
  test.each(passTestCases)('should return true if the parcel area ($landParcelArea) is greater than or equal to the minimum ($minimumArea)', function ({ landParcelArea, minimumArea }) {
    const application = {
      areaAppliedFor: 1,
      actionCodeAppliedFor: 'SAM1',
      landParcel: { area: landParcelArea }
    }
    const ruleConfig = { minArea: minimumArea }

    const result = rules['has-min-parcel-area'](application, ruleConfig)

    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the parcel area is less than the minimum', () => {
    const application = {
      areaAppliedFor: 1,
      actionCodeAppliedFor: 'SAM1',
      landParcel: { area: 1.5 }
    }
    const ruleConfig = { minArea: 2 }

    const result = rules['has-min-parcel-area'](application, ruleConfig)

    expect(result).toStrictEqual({ passed: false, message: `The parcel must have a total area of at least ${ruleConfig.minArea}ha` })
  })
})
