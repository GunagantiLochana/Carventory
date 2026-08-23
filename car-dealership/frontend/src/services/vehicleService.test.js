import { describe, test, expect, vi } from 'vitest'
import { purchaseVehicle } from './vehicleService'

describe('vehicleService', () => {
  test('purchases a vehicle', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'vehicle-1',
      }),
    })

    const result = await purchaseVehicle('vehicle-1')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8080/api/vehicles/vehicle-1/purchase',
      {
        method: 'POST',
        headers: {},
      },
    )

    expect(result).toEqual({
      id: 'vehicle-1',
    })

    fetchMock.mockRestore()
  })
})
