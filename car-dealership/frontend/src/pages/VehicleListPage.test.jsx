import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import VehicleListPage from './VehicleListPage'

vi.mock('../services/vehicleService', () => ({
  getVehicles: vi.fn(),
  purchaseVehicle: vi.fn(),
  deleteVehicle: vi.fn(),
}))

import { getVehicles } from '../services/vehicleService'

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAdmin: false,
  }),
}))

describe('VehicleListPage API integration', () => {
  test('loads vehicles from the vehicle service', async () => {
    getVehicles.mockResolvedValue([
      {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 3,
      },
    ])

    render(<VehicleListPage />)

    await waitFor(() => {
      expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    })

    expect(getVehicles).toHaveBeenCalled()
  })
})
