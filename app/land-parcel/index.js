const fs = require('fs')
const path = require('path')

let landParcels = []
const landParcelRawData = fs.readFileSync(path.join(__dirname, './land-parcels.json'), 'utf8')
landParcels = JSON.parse(landParcelRawData)

const getLandParcels = (sbi) => {
  return landParcels
    .filter(lp => lp.SBI === sbi.toString())
    .map((lp) => {
      return {
        parcelId: lp.PARCEL_ID,
        osSheetId: lp.SHEET_ID,
        lfaCode: lp.LFA_CODE,
        area: lp.AREA_HA
      }
    })
}

module.exports = {
  getLandParcels
}
