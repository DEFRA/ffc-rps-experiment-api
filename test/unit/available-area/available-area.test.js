const { availableArea } = require('../../../app/available-area/index')

const actionCompatibilityMatrix = {
  x: ['y'],
  y: ['x', 'z'],
  z: ['y'],
  za: ['zb'],
  zb: ['za']
}

const x = { code: 'x', area: 1.0 }
const y = { code: 'y', area: 1.0 }
const z = { code: 'z', area: 1.0 }

const emptyParcel = { area: 2.0 }
const parcelWithX = {
  ...emptyParcel,
  existingAgreements: [x]
}
const parcelWithXandY = {
  ...emptyParcel,
  existingAgreements: [x, y]
}

const parcelWithXandZ = {
  ...emptyParcel,
  existingAgreements: [x, z]
}

const parcelWithXand2HaY = {
  ...emptyParcel,
  existingAgreements: [x, { code: 'y', area: 2.0 }]
}

const parcelWith2HaYandX = {
  ...emptyParcel,
  existingAgreements: [{ code: 'y', area: 2.0 }, x]
}

const parcelWithZaAndZb = {
  ...emptyParcel,
  existingAgreements: [
    { code: 'za', area: 1.0 },
    { code: 'zb', area: 1.0 }
  ]
}

describe('availableArea', function () {
  test('should return 0.0 when no parameters passed', function () {
    expect(availableArea()).toEqual(0.0)
  })

  describe('WHEN has 2ha land parcel with no current agreement', () => {
    const parcel = emptyParcel

    describe('WHEN application made for action x', function () {
      test('should return 2.0 ha', function () {
        const result = availableArea({
          applicationFor: 'x',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })
  })

  describe('WHEN has 2ha land parcel with a 1ha agreement for action x', function () {
    const parcel = parcelWithX
    describe('WHEN application made for action y', function () {
      test('should return 1.0 ha', function () {
        const result = availableArea({
          applicationFor: 'y',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })

    describe('WHEN application made for action y', function () {
      test('should return 1.0 ha', function () {
        const result = availableArea({
          applicationFor: 'y',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })
  })

  describe('WHEN has 2ha land parcel with a 1ha agreement for both action x and y', function () {
    const parcel = parcelWithXandY
    describe('WHEN application made for action z', function () {
      test('should return 1.0 ha', function () {
        const result = availableArea({
          applicationFor: 'z',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(1.0)
      })
    })
  })

  describe('WHEN has 2ha land parcel with a 1ha agreement for both action x and z', function () {
    const parcel = parcelWithXandZ
    describe('WHEN application made for action y', function () {
      test('should return 2.0 ha', function () {
        const result = availableArea({
          applicationFor: 'y',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(2.0)
      })
    })
  })

  describe('WHEN has 2ha land parcel with a 1ha agreement for action x and 2 ha for action y', function () {
    const parcel = parcelWithXand2HaY
    describe('WHEN application made for action z', function () {
      test('should return 1.0 ha', function () {
        const result = availableArea({
          applicationFor: 'z',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(1.0)
      })
    })
  })

  describe('WHEN has 2ha land parcel with a 1ha agreement for and 2 ha for action y and action x', function () {
    const parcel = parcelWith2HaYandX
    describe('WHEN application made for action z', function () {
      test('should return 1.0 ha', function () {
        const result = availableArea({
          applicationFor: 'z',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(1.0)
      })
    })
  })

  describe('WHEN has 6ha land parcel with a 1ha agreement for and 2 ha for action y and action x', function () {
    const parcel = { ...parcelWith2HaYandX, area: 6.0 }
    describe('WHEN application made for action z', function () {
      test('should return 5.0 ha', function () {
        const result = availableArea({
          applicationFor: 'z',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(5.0)
      })
    })
  })

  describe('WHEN has 2ha land parcel with a 1ha agreement for actions za and zb', function () {
    const parcel = parcelWithZaAndZb

    describe('WHEN application made for action x', function () {
      test('should return 1.0 ha', function () {
        const result = availableArea({
          applicationFor: 'x',
          landParcel: parcel,
          actionCompatibilityMatrix
        })
        expect(result).toEqual(1.0)
      })
    })
  })
})
