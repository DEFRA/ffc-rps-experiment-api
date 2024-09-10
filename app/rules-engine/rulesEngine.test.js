const { executeRules } = require('./rulesEngine')
const { getAction } = require('../land-action')

describe('Rules Engine', function () {
  describe('executeRules', function () {
    test('should run all required rules', function () {
      // Arrange
      const application = {
        areaAppliedFor: 100,
        actionCodeAppliedFor: 'GRH7',
        landParcel: {
          area: 100,
          existingAgreements: [{ area: 100, code: 'LIG2' }]
        }
      }
      const action = getAction('GRH7')

      // Act
      const result = executeRules(application, action)

      // Assert
      expect(result).toStrictEqual(
        {
          passed: true,
          results: [
            { ruleName: 'supplement-area-matches-parent', passed: true }
          ]
        }
      )
    })
  })
})
