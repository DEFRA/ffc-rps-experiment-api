const { rules } = require('../../../../app/rules-engine/rules')

describe('is-less-than-max-parcel-area', function () {
  test('should return true if the parcel area ($landParcelArea) is less than the maximum', () => {
    const application = {
      areaAppliedFor: 1,
      actionCodeAppliedFor: 'SAM1',
      landParcel: { area: 16 }
    }
    const ruleConfig = { maxArea: 20 }

    const result = rules['is-less-than-max-parcel-area'](application, ruleConfig)

    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the parcel area is greater than the maximum', () => {
    const application = {
      areaAppliedFor: 1,
      actionCodeAppliedFor: 'SAM1',
      landParcel: { area: 20.1 }
    }
    const ruleConfig = { maxArea: 20 }

    const result = rules['is-less-than-max-parcel-area'](application, ruleConfig)

    expect(result).toStrictEqual({ passed: false, message: `The parcel must have a maximum total area of ${ruleConfig.maxArea}ha` })
  })
})
