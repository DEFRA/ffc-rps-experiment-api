const { db } = require('../database')

const getLandParcelsFromDb = async (sbi) => {
  try {
    const query = `
      SELECT id, sbi, parcelId, areaHa, sheetId, landCovers, agreements, landUses, attributes 
      FROM land_parcels 
      WHERE sbi = '${sbi}'
    `
    const landParcels = await db.public.many(query)
    return landParcels.map(row => ({
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
  } catch (err) {
    console.error('Error fetching land parcels:', err)
    throw err
  }
}

module.exports = {
  getLandParcelsFromDb
}
