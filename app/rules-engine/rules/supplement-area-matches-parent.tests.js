const { supplementAreaMatchesParent } = require('./supplement-area-matches-parent')

describe('supplementAreaMatchesParent', function () {
  test('should return true if the area applied for is equal to the parent area', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: [{ area: 100, code: 'CLIG3' }]
      }
    }

    // Act
    const result = supplementAreaMatchesParent('supplement-area-matches-parent', application)

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
    const result = supplementAreaMatchesParent('supplement-area-matches-parent', application)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Action code GRH7 requires an existing agreement for CLIG3' })
  })

  test('should return false if the user the areas dont match', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: [{ area: 101, code: 'CLIG3' }]
      }
    }

    // Act
    const result = supplementAreaMatchesParent('supplement-area-matches-parent', application)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Application is for GRH7 with an area of 100ha, the action CLIG3 is present but for an area of 101ha. These areas should match.' })
  })
})
