const { Pool } = require('pg')
const { getLandParcelsFromDb } = require('../../../app/land-parcel')

jest.mock('pg', () => {
  const mPool = {
    query: jest.fn()
  }
  return { Pool: jest.fn(() => mPool) }
})

describe('getLandParcelsFromDb', () => {
  let pool

  beforeAll(() => {
    pool = new Pool()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should fetch land parcels for a given SBI', async () => {
    const mockSBI = '123456789'
    const mockRows = [
      {
        id: 1,
        sbi: mockSBI,
        parcelid: 'PARCEL1',
        areaha: 1.5,
        sheetid: 'SHEET1',
        landcovers: 'Grassland',
        agreements: 'Agreement1',
        landuses: 'Grazing',
        attributes: '{"moorlandLineStatus": "below"}'
      }
    ]

    pool.query.mockResolvedValue({ rows: mockRows })

    const result = await getLandParcelsFromDb(mockSBI)

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [mockSBI])
    expect(result).toEqual([
      {
        id: 1,
        sbi: mockSBI,
        parcelId: 'PARCEL1',
        area: 1.5,
        osSheetId: 'SHEET1',
        landCovers: 'Grassland',
        agreements: 'Agreement1',
        landUseList: 'Grazing',
        attributes: '{"moorlandLineStatus": "below"}'
      }
    ])
  })

  test('should handle empty results from the database', async () => {
    const mockSBI = '987654321'

    pool.query.mockResolvedValue({ rows: [] })

    const result = await getLandParcelsFromDb(mockSBI)

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), [mockSBI])
    expect(result).toEqual([])
  })

  test('should throw an error if the database query fails', async () => {
    const mockSBI = '123456789'
    const mockError = new Error('Database error')

    pool.query.mockRejectedValue(mockError)

    await expect(getLandParcelsFromDb(mockSBI)).rejects.toThrow('Database error')
  })
})
