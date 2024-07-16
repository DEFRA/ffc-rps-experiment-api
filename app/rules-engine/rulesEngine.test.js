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
  })

  // describe('supplementAreaMatchesParent', function () {
  //   test('DMN - should return true if the area applied for is equal to the parent area', async function () {
  //     // Arrange
  //     const application = {
  //       areaAppliedFor: 100,
  //       actionCodeAppliedFor: 'GRH7',
  //       landParcel: {
  //         existingAgreements: [{ area: 100, code: 'CLIG3' }]
  //       }
  //     }
  //     const rulesEngine = createDmnRulesEngine()

  //     // Act
  //     const result = await rulesEngine.supplementAreaMatchesParent(application)

  //     // Assert
  //     expect(result).toBe(true)
  //   })
  // })
})
