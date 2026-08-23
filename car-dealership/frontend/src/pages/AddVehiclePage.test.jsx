import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import AddVehiclePage from './AddVehiclePage'
import { createVehicle } from '../services/vehicleService'

vi.mock('../services/vehicleService', () => ({
  createVehicle: vi.fn(),
}))

describe('AddVehiclePage', () => {
  test('renders add vehicle form', () => {
    render(<AddVehiclePage />)

    expect(screen.getByLabelText(/make/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument()
  })

  test('submits vehicle data', async () => {
    createVehicle.mockResolvedValue({
      id: '1',
      make: 'Toyota',
      model: 'Camry',
    })

    render(<AddVehiclePage />)

    fireEvent.change(screen.getByLabelText(/make/i), {
      target: { value: 'Toyota' },
    })

    fireEvent.change(screen.getByLabelText(/model/i), {
      target: { value: 'Camry' },
    })

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'Sedan' },
    })

    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: '25000' },
    })

    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: '5' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: /add vehicle/i })
    )

    await waitFor(() => {
      expect(createVehicle).toHaveBeenCalledWith({
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 5,
      })
    })
  })
})
