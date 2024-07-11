const { engine } = require('./workflow-engine')

async function getRequest(scope, callback) {
  console.log('scope:', scope)
  console.log('callback:', callback)
  return callback(null, { statusCode: 200, body: { result: 'approve' } })
}

describe('workflow-engine', function () {
  test('should execute a workflow', function () {
    engine.execute(
      {
        variables: {
          id: Math.floor(Math.random() * 10000),
          isBad: false
        },
        services: { getRequest }
      },
      (err, execution) => {
        if (err) throw err

        console.log(
          'Service task output:',
          execution.environment.output.serviceResult
        )
      }
    )
    expect(true).toEqual(false)
  })
})
