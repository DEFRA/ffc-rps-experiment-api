const actions = [
  {
    code: 'SAM1',
    description: 'Assess soil, test soil organic matter and produce a soil management plan',
    eligibleLandUses: ['Various arable and horticultural land types'],
    payment: {
      amountPerHectare: 5.80,
      additionalPaymentPerAgreement: 95.0
    }
  },
  {
    code: 'SAM2',
    description: 'Multi-species winter cover crop',
    eligibleLandUses: ['TG01', 'FA01', 'TC01'],
    payment: {
      amountPerHectare: 129.0
    }
  },
  {
    code: 'SAM3',
    description: 'Herbal leys',
    eligibleLandUses: ['Arable land', 'Temporary grassland', 'Arable land lying fallow', 'Improved permanent grassland'],
    payment: {
      amountPerHectare: 382.0
    }
  },
  {
    code: 'LIG1',
    description: 'Manage grassland with very low nutrient inputs (outside SDAs)',
    eligibleLandUses: ['Temporary grassland', 'Permanent grassland – improved and low input'],
    payment: {
      amountPerHectare: 151.0
    }
  }
]
module.exports = { actions }
