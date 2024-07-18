const fs = require('fs')
const path = require('path')

let landParcels = []

const initLandParcelCache = () => {
  const landParcelRawData = JSON.parse(fs.readFileSync(path.join(__dirname, './land-parcels.json'), 'utf8'))
  landParcels = landParcelRawData.reduce(
    (lpMap, lp) => lpMap.set(
      parseInt(lp.SBI, 10),
      [...lpMap.get(parseInt(lp.SBI, 10)) || [],
        {
          parcelId: lp.PARCEL_ID,
          osSheetId: lp.SHEET_ID,
          // lfaCode: lp.LFA_CODE,
          area: lp.AREA_HA,
          landUseList: lp.LAND_USES
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
