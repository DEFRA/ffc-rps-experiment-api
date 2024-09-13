const { rules } = require('../../../../app/rules-engine/rules/index')

describe('is-below-moorland-line', function () {
  test('should return true if the land parcel is below the moorland line', function () {
    // Arrange
    const application = {
      landParcel: {
        moorlandLineStatus: 'below'
      }
    }

    // Act
    const result = rules['is-below-moorland-line'](application)

    // Assert
    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the land parcel is above the moorland line', function () {
    // Arrange
    const application = {
      landParcel: {
        moorlandLineStatus: 'above'
      }
    }

    // Act
    const result = rules['is-below-moorland-line'](application)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Land parcel is above the moorland line' })
  })
})
