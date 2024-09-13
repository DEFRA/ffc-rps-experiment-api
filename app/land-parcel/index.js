const fs = require('fs')
const path = require('path')

let landParcels = []

const initLandParcelCache = () => {
  const landParcelRawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../static-data/land-parcels.json'), 'utf8'))
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

initLandParcelCache()

module.exports = {
  getLandParcels
}
