const { rules } = require('./')

const SUPPLEMENT_AREA_RULE_ID = 'supplement-area-matches-parent'
const SUPPLEMENT_AREA_RULE_CONFIG = { baseActions: ['CLIG3', 'LIG1', 'LIG2', 'GRH6'] }

describe('supplementAreaMatchesParent', function () {
  test('should return true if the area applied for is equal to the parent area', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: [{ area: 100, code: 'LIG2' }]
      }
    }

    // Act
    const result = rules[SUPPLEMENT_AREA_RULE_ID](application, SUPPLEMENT_AREA_RULE_CONFIG)

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
    const result = rules[SUPPLEMENT_AREA_RULE_ID](application, SUPPLEMENT_AREA_RULE_CONFIG)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Action code GRH7 requires an existing agreement with any of: CLIG3, LIG1, LIG2, GRH6' })
  })

  test('should return false if the user the areas dont match', function () {
    // Arrange
    const application = {
      areaAppliedFor: 100,
      actionCodeAppliedFor: 'GRH7',
      landParcel: {
        existingAgreements: [{ area: 101, code: 'LIG2' }]
      }
    }

    // Act
    const result = rules[SUPPLEMENT_AREA_RULE_ID](application, SUPPLEMENT_AREA_RULE_CONFIG)

    // Assert
    expect(result).toStrictEqual({ passed: false, message: 'Application is for GRH7 with an area of 100ha, the base action(s) LIG2 (101ha) is/are present. These areas should match.' })
  })
})
