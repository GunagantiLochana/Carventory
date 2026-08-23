import { describe, test, expect, vi, beforeEach } from 'vitest'
import { purchaseVehicle } from './vehicleService'

describe('vehicleService authentication', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  test('attaches JWT token to protected vehicle request', async () => {
    localStorage.setItem('token', 'test-jwt-token')

    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue({
        ok: true,
        json: async () => ({ id: 'vehicle-1' }),
      })

    await purchaseVehicle('vehicle-1')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/vehicles/vehicle-1/purchase',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer test-jwt-token',
        }),
      }),
    )
  })
})
