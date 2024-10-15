const ACTION_COMPATIBILITY_MATRIX = {
  x: ['y'],
  y: ['x', 'z'],
  z: ['y'],
  za: ['zb'],
  zb: ['za'],
  SAM1: ['SAM3', 'SAM2', 'AB3', 'LIG1', 'CSAM2', 'GRH1'],
  SAM2: ['SAM1', 'SAM3', 'CSAM1'],
  SAM3: ['SAM1', 'SAM2', 'CSAM1'],
  LIG1: ['SAM1', 'CSAM1'],
  AB3: ['SAM1', 'CSAM1', 'CSAM2'],
  GRH1: ['SAM1', 'CSAM1'],
  CSAM1: [
    'AB1', 'AB10', 'AB11', 'AB13', 'AB14', 'AB15', 'AB16', 'AB2', 'AB3', 'AB5', 'AB6', 'AB7', 'AB8',
    'AB9', 'AGF1', 'AGF2', 'AHL1', 'AHL2', 'AHL3', 'AHL4', 'AHW1', 'AHW10', 'AHW11', 'AHW12', 'AHW3',
    'AHW4', 'AHW5', 'AHW6', 'AHW7', 'AHW8', 'AHW9', 'AL1A', 'AL2A', 'AL3A', 'BE1', 'BE2', 'BE4',
    'BE5', 'BFS1', 'BFS2', 'BFS3', 'BFS4', 'BFS5', 'BFS6', 'CAHL1', 'CAHL2', 'CAHL3', 'CAHL4',
    'CIGL1', 'CIGL2', 'CIGL3', 'CIPM1', 'CIPM2', 'CIPM3', 'CIPM4', 'CLIG3', 'CNUM1', 'CNUM2',
    'CNUM3', 'CSAM2', 'CSAM3', 'CT1', 'CT2', 'CT3', 'CT4', 'CT5', 'CT7', 'GRH1', 'GRH6', 'GS1',
    'GS10', 'GS11', 'GS12', 'GS13', 'GS14', 'GS2', 'GS3', 'GS4', 'GS5', 'GS6', 'GS7', 'GS8',
    'GS9', 'HEF5', 'HEF6', 'HS3', 'HS4', 'HS7', 'HS9', 'IG1A', 'IG2A', 'IG3A', 'IGL1', 'IGL2',
    'IGL3', 'IPM1', 'IPM2', 'IPM3', 'IPM4', 'LH1', 'LH2', 'LH3', 'LIG1', 'LIG2', 'NUM1', 'NUM2',
    'NUM3', 'OFA1', 'OFA6', 'OFC1', 'OFC2', 'OFC3', 'OFC4', 'OFC5', 'OFM1', 'OFM2', 'OFM4',
    'OFM5', 'OFM6', 'OP1', 'OP2', 'OP4', 'OP5', 'OR1', 'OR2', 'OR3', 'OR4', 'OR5', 'OT1', 'OT2',
    'OT3', 'OT4', 'OT5', 'PRF1', 'PRF2', 'PRF3', 'PRF4', 'SAM2', 'SAM3', 'SCR1', 'SCR2', 'SI1A',
    'SI2A', 'SI3A', 'SOH1', 'SOH2', 'SOH3', 'SOH4', 'SW1', 'SW10', 'SW12', 'SW13', 'SW15', 'SW16',
    'SW17', 'SW18', 'SW2', 'SW3', 'SW4', 'SW5', 'SW6', 'SW7', 'SW8', 'SW9', 'UP2', 'WB1B', 'WB2B',
    'WB3B', 'WBD3', 'WBD4', 'WBD5', 'WBD6', 'WBD7', 'WBD8', 'WT1', 'WT10', 'WT2', 'WT6', 'WT7',
    'WT8', 'WT9'
  ],
  CSAM2: [
    'AB11', 'AB14', 'AB5', 'AGF1', 'AGF2', 'AHW10', 'AHW11', 'AHW5', 'CIPM1', 'CIPM3', 'CIPM4',
    'CNUM1', 'CSAM1', 'HS3', 'HS9', 'IPM1', 'IPM3', 'IPM4', 'NUM1', 'OFA6', 'OFC3', 'OFC4',
    'OFM4', 'OFM5', 'OP5', 'OR3', 'OR4', 'OT3', 'OT4', 'PRF1', 'PRF2', 'PRF3', 'PRF4', 'SAM1',
    'SOH1', 'SOH2', 'SOH3'
  ]
}

function applyUpdate (newEntries, actionCompatibilityMatrix) {
  for (const key in newEntries) {
    actionCompatibilityMatrix[key] = newEntries[key]
  }
}

module.exports = {
  actionCompatibilityMatrix: ACTION_COMPATIBILITY_MATRIX,
  updateMatrix (newEntries) {
    applyUpdate(newEntries, ACTION_COMPATIBILITY_MATRIX)
  }
}
