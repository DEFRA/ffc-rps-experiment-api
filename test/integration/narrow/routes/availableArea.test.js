describe('available area calculation test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  test('POST /availableArea route with all valid parameters added returns 200', async () => {
    const applicationFor = 'x'
    const landParcel = { area: 2.0 }
    const options = {
      method: 'POST',
      url: '/availableArea',
      payload: { applicationFor, landParcel }
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(200)
  })

  test('POST /availableArea route with missing parameters returns 400', async () => {
    const applicationFor = 'x'
    // Missing landParcel
    const options = {
      method: 'POST',
      url: '/availableArea',
      payload: { applicationFor }
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(400)
  })

  afterEach(async () => {
    await server.stop()
  })

  test('POST /availableArea route WHEN has 2ha land parcel with no current agreement', async () => {
    const expectedAvailableArea = 2.0
    const applicationFor = 'x'
    const landParcel = { area: 2.0 }
    const options = {
      method: 'POST',
      url: '/availableArea',
      payload: { applicationFor, landParcel }
    }
    const response = await server.inject(options)
    console.log('RESULT::' + JSON.stringify({ applicationFor, landParcel }))
    expect(response.result).toBe(expectedAvailableArea)
  })

  test('POST /availableArea route WHEN has 2ha land parcel with a 1ha agreement for both action x and y', async () => {
    const x = { code: 'x', area: 1.0 }
    const y = { code: 'y', area: 1.0 }
    const expectedAvailableArea = 1.0
    const applicationFor = 'z'
    const emptyParcel = { area: 2.0 }
    const parcelWithXandY = { ...emptyParcel, existingAgreements: [x, y] }
    const options = {
      method: 'POST',
      url: '/availableArea',
      payload: { applicationFor, landParcel: parcelWithXandY }
    }
    const response = await server.inject(options)
    expect(response.result).toBe(expectedAvailableArea)
  })

  test('PATCH /availableArea/matrix route should update matrix', async () => {
    const x = { code: 'x', area: 1.0 }
    const y = { code: 'y', area: 1.0 }
    const applicationFor = 'z'
    const emptyParcel = { area: 4.0 }
    const parcelWithXandY = { ...emptyParcel, existingAgreements: [x, y] }
    const postOptions = {
      method: 'POST',
      url: '/availableArea',
      payload: { applicationFor, landParcel: parcelWithXandY }
    }
    const beforeUpdate = await server.inject(postOptions)

    await updateMatrix(server)

    const afterUpdate = await server.inject(postOptions)

    expect(afterUpdate.result).not.toBe(beforeUpdate.result)
  })

  test('PATCH /availableArea/matrix route with invalid key returns 400', async () => {
    const newEntries = { invalidKey: ['z'] }
    const options = {
      method: 'PATCH',
      url: '/availableArea/matrix',
      payload: newEntries
    }
    const response = await server.inject(options)
    expect(response.statusCode).toBe(400)
  })

  test('POST /availableArea route fills in missing area and code values in existingAgreements', async () => {
    const applicationFor = 'x'
    const landParcel = {
      area: 2.0,
      existingAgreements: [{ code: '', area: null }, { code: null, area: 1.0 }]
    }
    const options = {
      method: 'POST',
      url: '/availableArea',
      payload: { applicationFor, landParcel }
    }
    const response = await server.inject(options)

    expect(response.result).toBe(1)
  })
})

async function updateMatrix (server) {
  const options = {
    method: 'PATCH',
    url: '/availableArea/matrix',
    payload: { y: [''], x: [''], z: [''] }
  }
  const response = await server.inject(options)
  expect(response.statusCode).toBe(200)
  expect(response.result.message).toBe('Matrix updated successfully')
  expect(response.result.matrix.x).toEqual([''])
  expect(response.result.matrix.y).toEqual([''])
  expect(response.result.matrix.z).toEqual([''])
}
