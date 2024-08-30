const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const getLandParcelsBySbi = (sbi) => {
  return pool.query(
    'SELECT parcelId AS "parcelId", sheetId AS "osSheetId", areaHa AS area, landUses AS "landUseList", agreements, attributes FROM land_parcels WHERE sbi = $1',
    [sbi]
  ).then(result => {
    return result.rows.map(row => ({
      parcelId: row.parcelId,
      osSheetId: row.osSheetId,
      area: row.area,
      landUseList: row.landUseList,
      agreements: row.agreements,
      attributes: row.attributes
    }))
  }).catch(error => {
    console.error('Error fetching land parcels:', error)
    throw error
  })
}

module.exports = {
  getLandParcelsBySbi
}
