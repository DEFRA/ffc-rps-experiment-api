const { getLandParcelsFromDb } = require('../../../app/land-parcel')

jest.mock('../../../app/database', () => ({
  db: {
    public: {
      many: jest.fn()
    }
  }
}))

describe('getLandParcelsFromDb', () => {
  let db

  beforeAll(() => {
    db = require('../../../app/database').db
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

    db.public.many.mockResolvedValue(mockRows)

    const result = await getLandParcelsFromDb(mockSBI)
    expect(db.public.many).toHaveBeenCalledWith(expect.stringContaining('WHERE sbi = \'' + mockSBI + '\''))
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

    db.public.many.mockResolvedValue([])

    const result = await getLandParcelsFromDb(mockSBI)
    expect(db.public.many).toHaveBeenCalledWith(expect.stringContaining('WHERE sbi = \'' + mockSBI + '\''))
    expect(result).toEqual([])
  })

  test('should throw an error if the database query fails', async () => {
    const mockSBI = '123456789'
    const mockError = new Error('Database error')

    db.public.many.mockRejectedValue(mockError)

    await expect(getLandParcelsFromDb(mockSBI)).rejects.toThrow('Database error')
  })
})
