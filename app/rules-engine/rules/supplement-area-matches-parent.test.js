const { defaultConfig } = require('../config')
const { rules } = require('./')

describe('supplementAreaMatchesParent', function () {
  test('should return true if the area applied for is equal to the parent area', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: [{ area: 100, code: 'LIG3' }]
      }
    }

    // Act
    const result = rules['supplement-area-matches-parent'](application, defaultConfig)

    // Assert
    expect(result).toStrictEqual({ passed: true })
  })

  test('should return false if the user doesnt have the parent action', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: []
      }
    }

    // Act
    const result = rules['supplement-area-matches-parent'](application, defaultConfig)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Action code GRH7 requires an existing agreement for LIG3' })
  })

  test('should return false if the user the areas dont match', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: [{ area: 101, code: 'LIG3' }]
      }
    }

    // Act
    const result = rules['supplement-area-matches-parent'](application, defaultConfig)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Application is for GRH7 with an area of 100ha, the action LIG3 is present but for an area of 101ha. These areas should match.' })
  })
})
