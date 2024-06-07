const { availableArea } = require('.')

const actionCompatibilityMatrix = {
  x: ['y'],
  y: ['x', 'z'],
  z: ['y']
}

describe('availableArea', function () {
  test('should return 0.0 when no parameters passed', function () {
    expect(availableArea()).toEqual(0.0)
  })

  describe('when has 2ha land parcel', () => {
    const parcel = { area: 2.0 }

    describe('when has 2ha land parcel with no current action and application made for action x', function () {
      test('should return 2.0 ha', function () {
        const result = availableArea({
          applicationFor: 'x',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })
    describe('WHEN has 2ha land parcel AND a 1ha agreement for action x AND application made for action y', function () {
      test('should return 1.0 ha', function () {
        const parcel = {
          area: 2.0,
          existingAgreements: [{ code: 'x', area: 1.0 }]
        }
        const result = availableArea({
          applicationFor: 'y',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })
    describe('WHEN has 2ha land parcel AND a 1ha agreement for action x AND application made for action y', function () {
      test('should return 1.0 ha', function () {
        const parcel = {
          area: 2.0,
          existingAgreements: [{ code: 'x', area: 1.0 }]
        }
        const result = availableArea({
          applicationFor: 'y',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })
  })
})
