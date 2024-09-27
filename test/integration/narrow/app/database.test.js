const { db, initializeDatabase } = require('../../../../app/database')

describe('Smoke Test', () => {
  let pgClient
  beforeAll(async () => {
    await initializeDatabase()
    pgClient = new (db.adapters.createPg().Client)()
    await pgClient.connect()
  })

  afterAll(async () => {
    await pgClient.end()
  })

  test('should count the number of records in the land_parcels table', async () => {
    const result = await pgClient.query('SELECT COUNT(*) FROM land_parcels')
    expect(Number(result.rows[0].count)).toBeGreaterThan(0)
  })
})
