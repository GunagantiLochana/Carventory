import { describe, test, expect, vi, beforeEach } from 'vitest'
import { purchaseVehicle } from './vehicleService'

describe('vehicleService', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  test('purchases a vehicle', async () => {
    const responseData = {
      id: 'vehicle-1',
      quantity: 2,
    }

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => responseData,
    })

    const result = await purchaseVehicle('vehicle-1')

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/vehicles/vehicle-1/purchase',
      {
        method: 'POST',
      }
    )

    expect(result).toEqual(responseData)
  })
})
