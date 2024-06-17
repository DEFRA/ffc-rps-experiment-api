const { getLandParcels } = require('../../../app/land-parcel')

describe('get land parcels by SBI', () => {
  test('should return an empty array when an unknown SBI is provided', () => {
    const landParcels = getLandParcels(1234)
    expect(landParcels.length).toEqual(0)
  })
  test('should return the land parcels when a known SBI is provided', () => {
    const landParcels = getLandParcels(200599768)
    expect(landParcels.length).toEqual(13)
  })
})
