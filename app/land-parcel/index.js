const fs = require('fs')
const path = require('path')

let landParcels = []

const initLandParcelCache = () => {
  const landParcelRawData = JSON.parse(fs.readFileSync(path.join(__dirname, './land-parcels.json'), 'utf8'))
  landParcels = landParcelRawData.reduce(
    (lpMap, lp) => lpMap.set(
      parseInt(lp.sbi, 10),
      [...lpMap.get(parseInt(lp.sbi, 10)) || [],
        {
          parcelId: lp.parcelId,
          osSheetId: lp.sheetId,
          // lfaCode: lp.LFA_CODE,
          area: lp.areaHa,
          landUseList: lp.landUses,
          agreements: lp.agreements,
          attributes: lp.attributes
        }]),
    new Map())
}

const getLandParcels = (sbi) => {
  return landParcels.get(sbi) ?? []
}

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

const getLandParcelsFromDb = async (sbi) => {
  console.log('Fetching land parcels for SBI:', sbi)
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
  console.log('Land parcels from DB:', landParcels)
  return landParcels
}

initLandParcelCache()

module.exports = {
  getLandParcels,
  getLandParcelsFromDb
}
