const { rules } = require('.')

describe('is-outside-sda', function () {
  test('should return true if the land parcel is outside of a Severely Disadvantaged Area', function () {
    // Arrange
    const application = {
      landParcel: {
        tags: []
      }
    }

    // Act
    const result = rules['is-outside-sda'](application)

    // Assert
    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the land parcel is inside of a Severely Disadvantaged Area', function () {
    // Arrange
    const application = {
      landParcel: {
        tags: ['is-sda']
      }
    }

    // Act
    const result = rules['is-outside-sda'](application)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Land parcel is inside of a Severely Disadvantaged Area' })
  })
})
