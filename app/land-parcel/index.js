const { Pool } = require('pg')
const pool = new Pool({
  connectionString: `postgres://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
})

const getLandParcelsFromDb = async (sbi) => {
  const query = `
    SELECT id, sbi, parcelId, areaHa, sheetId, landCovers, agreements, landUses, attributes 
    FROM land_parcels 
    WHERE sbi = $1
  `
  const result = await pool.query(query, [sbi])
  const landParcels = result.rows.map(row => ({
    id: row.id,
    sbi: row.sbi,
    parcelId: row.parcelid,
    area: row.areaha,
    osSheetId: row.sheetid,
    landCovers: row.landcovers,
    agreements: row.agreements,
    landUseList: row.landuses,
    attributes: row.attributes
  }))
  return landParcels
}

module.exports = {
  getLandParcelsFromDb
}
