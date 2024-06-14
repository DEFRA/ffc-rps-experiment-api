describe('available area calculation test', () => {
  const server = require('../../../../app/server')

  beforeEach(async () => {
    await server.start()
  })

  test('POST /available-area route should return 200 when all parameters are valid', async () => {
    const request = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'x', landParcel: { area: 2.0 } }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
  })

  test('POST /available-area route should return 400 when there are missing parameters', async () => {
    // Missing landParcel
    const request = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'x' }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })

  afterEach(async () => {
    await server.stop()
  })

  test('POST /available-area route should return 200 when input has 2ha land parcel with no current agreement', async () => {
    const expectedAvailableArea = 2.0
    const request = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'x', landParcel: { area: 2.0 } }
    }
    const response = await server.inject(request)
    expect(response.result).toBe(expectedAvailableArea)
  })

  test('POST /available-area route should return 200 when input has 2ha land parcel with a 1ha agreement for both action x and y', async () => {
    const x = { code: 'x', area: 1.0 }
    const y = { code: 'y', area: 1.0 }
    const parcelWithXandY = { area: 2.0, existingAgreements: [x, y] }
    const request = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'z', landParcel: parcelWithXandY }
    }
    const response = await server.inject(request)
    expect(response.result).toBe(1.0)
  })

  test('POST /available-area route should return 200 when existing agreements have an area of 0', async () => {
    const landParcel = {
      area: 2.0,
      existingAgreements: [{ code: 'x', area: 0 }, { code: 'y', area: 0 }] // Existing agreements with area of 0
    }
    const request = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'z', landParcel }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(200)
  })

  test('POST /available-area route should return 400 when input with invalid existing agreement', async () => {
    const landParcel = {
      area: 2.0,
      existingAgreements: [{ code: 'y', area: null }] // Invalid existing agreement
    }
    const request = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'x', landParcel }
    }
    const response = await server.inject(request)
    expect(response.statusCode).toBe(400)
  })

  test('PATCH /available-area/matrix route should return 200 with valid input for matrix update', async () => {
    const x = { code: 'x', area: 1.0 }
    const y = { code: 'y', area: 1.0 }
    const parcelWithXandY = { area: 4.0, existingAgreements: [x, y] }
    const postRequest = {
      method: 'POST',
      url: '/available-area',
      payload: { applicationFor: 'z', landParcel: parcelWithXandY }
    }
    const beforeUpdate = await server.inject(postRequest)

    await updateMatrix(server)

    const afterUpdate = await server.inject(postRequest)

    expect(afterUpdate.result).not.toBe(beforeUpdate.result)
  })
})

async function updateMatrix (server) {
  const options = {
    method: 'PATCH',
    url: '/available-area/matrix',
    payload: { y: [''], x: [''], z: [''], q: ['x', 'z'] }
  }
  const response = await server.inject(options)
  expect(response.statusCode).toBe(200)
  expect(response.result.message).toBe('Matrix updated successfully')
  expect(response.result.matrix.x).toEqual([''])
  expect(response.result.matrix.y).toEqual([''])
  expect(response.result.matrix.z).toEqual([''])
}
