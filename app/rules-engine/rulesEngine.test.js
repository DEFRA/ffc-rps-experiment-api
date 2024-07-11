const { createRulesEngine } = require('./rulesEngine')

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
      const rulesEngine = createRulesEngine()

      // Act
      const result = rulesEngine.supplementAreaMatchesParent(application)

      // Assert
      expect(result).toBe(true)
    })
  })
})
