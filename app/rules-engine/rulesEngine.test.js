const action = require('../routes/action')
const { executeRule } = require('./rulesEngine')

describe('Rules Engine', function () {
  describe('supplementAreaMatchesParent', function () {
    test('JS - should return true if the area applied for is equal to the parent area', function () {
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

    test('JS - should return false if the user doesnt have the parent action', function () {
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

    test('JS - should return false if the user the areas dont match', function () {
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
    test('JS - should return true if the action is "whole parcel only" and area applied for is equal to the parcel area', function () {
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

    test('JS - should return false if the action is "whole parcel only" and area applied for is not equal to the parcel area', function () {
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
})
