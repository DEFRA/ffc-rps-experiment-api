const { executeApplicableRules } = require('./rulesEngine')
const { defaultConfig } = require('./config')

describe('Rules Engine', function () {
  describe('executeApplicableRules', function () {
    test('should run all required rules', function () {
      // Arrange
      const application = {
        areaAppliedFor: 100,
        actionCodeAppliedFor: 'GRH7',
        landParcel: {
          area: 100,
          existingAgreements: [{ area: 100, code: 'LIG3' }]
        }
      }

      const config = {
        ...defaultConfig,
        actions: {
          ...defaultConfig.actions,
          GRH7: {
            name: 'Haymaking supplement',
            supplementFor: 'LIG3',
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
