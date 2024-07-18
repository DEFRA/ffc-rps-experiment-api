const { executeRule, executeApplicableRules } = require('./rulesEngine')
const { defaultConfig } = require('./config')

describe('Rules Engine', function () {
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
      const result = executeRule('supplement-area-matches-parent', application)

      // Assert
      expect(result).toBe(true)
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
      const result = executeRule('supplement-area-matches-parent', application)

      // Assert
      expect(result).toBe(false)
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
      const result = executeRule('supplement-area-matches-parent', application)

      // Assert
      expect(result).toBe(false)
    })
  })

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
      const result = executeRule('is-for-whole-parcel-area', application)

      // Assert
      expect(result).toBe(true)
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
      const result = executeRule('is-for-whole-parcel-area', application)

      // Assert
      expect(result).toBe(false)
    })
  })

  describe('executeApplicableRules', function () {
    test('should run all required rules', function () {
      // Arrange
      const application = {
        areaAppliedFor: 100,
        actionCodeAppliedFor: 'GRH7',
        landParcel: {
          area: 100,
          existingAgreements: [{ area: 100, code: 'CLIG3' }]
        }
      }

      const config = {
        ...defaultConfig,
        actions: {
          ...defaultConfig.actions,
          GRH7: {
            name: 'Haymaking supplement',
            supplementFor: 'CLIG3',
            wholeParcelOnly: true,
            applicableRules: ['supplement-area-matches-parent', 'is-for-whole-parcel-area']
          }
        }
      }

      // Act
      const result = executeApplicableRules(application, config)

      // Assert
      expect(result).toStrictEqual(
        {
          overallResult: true,
          results: [
            { ruleName: 'supplement-area-matches-parent', passed: true },
            { ruleName: 'is-for-whole-parcel-area', passed: true }
          ]
        }
      )
    })
  })
})
