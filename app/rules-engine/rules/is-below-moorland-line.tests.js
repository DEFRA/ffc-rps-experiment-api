const { isBelowMoorlandLine } = require('./is-below-moorland-line')

describe('is-below-moorland-line', function () {
  test('should return true if the land parcel is below the moorland line', function () {
    // Arrange
    const application = {
      landParcel: {
        moorlandLineStaus: 'below'
      }
    }

    // Act
    const result = isBelowMoorlandLine(application)

    // Assert
    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the land parcel is above the moorland line', function () {
    // Arrange
    const application = {
      landParcel: {
        moorlandLineStaus: 'above'
      }
    }

    // Act
    const result = isBelowMoorlandLine(application)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Land parcel is above the moorland line' })
  })
})
