const { rules } = require('../../../../app/rules-engine/rules/index')

describe('is-for-whole-parcel-area', function () {
  test('should return true if the action is "whole parcel only" and area applied for is equal to the parcel area', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'SAM1',
      landParcel: {
        area: 100
      }
    }

    // Act
    const result = rules['is-for-whole-parcel-area'](application)

    // Assert
    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the action is "whole parcel only" and area applied for is not equal to the parcel area', function () {
    // Arrange
    const application = {
      areaAppliedFor: 99,
      actionCodeAppliedFor: 'SAM1',
      landParcel: {
        area: 100
      }
    }

    // Act
    const result = rules['is-for-whole-parcel-area'](application)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Area applied for (99ha) does not match parcel area (100ha)' })
  })
})
