import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import EditVehiclePage from './EditVehiclePage'
import { updateVehicle } from '../services/vehicleService'

vi.mock('../services/vehicleService', () => ({
  updateVehicle: vi.fn(),
}))

describe('EditVehiclePage', () => {
  test('updates an existing vehicle', async () => {
    updateVehicle.mockResolvedValue({
      id: '1',
      make: 'Toyota',
      model: 'Camry',
    })

    const vehicle = {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 3,
    }

    render(<EditVehiclePage vehicle={vehicle} />)

    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '27000' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /update vehicle/i })
    )

    await waitFor(() => {
      expect(updateVehicle).toHaveBeenCalledWith('1', {
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 27000,
        quantity: 3,
      })
    })
  })
})
