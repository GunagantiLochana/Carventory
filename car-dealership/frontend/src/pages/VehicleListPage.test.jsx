import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import VehicleListPage from './VehicleListPage'
import { deleteVehicle } from '../services/vehicleService'

vi.mock('../services/vehicleService', () => ({
  deleteVehicle: vi.fn(),
  purchaseVehicle: vi.fn(),
}))

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    isAdmin: true,
  }),
}))

describe('VehicleListPage delete behavior', () => {
  test('deletes a vehicle when delete button is clicked', async () => {
    deleteVehicle.mockResolvedValue(true)

    const vehicles = [
      {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 3,
      },
    ]

    render(<VehicleListPage vehicles={vehicles} />)

    fireEvent.click(
      screen.getByRole('button', { name: /delete/i })
    )

    await waitFor(() => {
      expect(deleteVehicle).toHaveBeenCalledWith('1')
    })
  })
})
