const { rules } = require('../../../../app/rules-engine/rules')

const passTestCases = [
  { landParcelArea: 2, areaAppliedFor: 2 },
  { landParcelArea: 2, areaAppliedFor: 1 }
]

describe('is-within-parcel-area', function () {
  test.each(passTestCases)('should return true if the parcel area applied for ($areaAppliedFor) is less than than or equal to the ($landParcelArea)', function ({ landParcelArea, areaAppliedFor }) {
    const application = {
      areaAppliedFor: 1,
      actionCodeAppliedFor: 'CSAM2',
      landParcel: { area: landParcelArea }
    }
    const result = rules['is-within-parcel-area'](application)

    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the area applied for is greater than the parcel area', () => {
    const application = {
      areaAppliedFor: 10,
      actionCodeAppliedFor: 'CSAM2',
      landParcel: { area: 1.5 }
    }
    const result = rules['is-within-parcel-area'](application)

    expect(result).toStrictEqual({ passed: false, message: 'Area applied for (10ha) is greater than parcel area (1.5ha)' })
  })
})
