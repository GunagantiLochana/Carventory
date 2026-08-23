import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import VehicleListPage from './VehicleListPage'
import { purchaseVehicle } from '../services/vehicleService'

vi.mock('../services/vehicleService', () => ({
  purchaseVehicle: vi.fn(),
}))

describe('VehicleListPage purchase behavior', () => {
  const vehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 3,
      imageUrl: 'https://example.com/camry.jpg',
    },
    {
      id: '2',
      make: 'Honda',
      model: 'Civic',
      category: 'Sedan',
      price: 22000,
      quantity: 0,
      imageUrl: 'https://example.com/civic.jpg',
    },
  ]

  test('purchase button is enabled when vehicle is in stock', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    const buttons = screen.getAllByRole('button', { name: /purchase/i })

    expect(buttons[0]).toBeEnabled()
  })

  test('purchase button is disabled when quantity is zero', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    const buttons = screen.getAllByRole('button', { name: /purchase/i })

    expect(buttons[1]).toBeDisabled()
  })

  test('does not purchase vehicle when quantity is zero', async () => {
    render(<VehicleListPage vehicles={vehicles} />)

    const buttons = screen.getAllByRole('button', { name: /purchase/i })

    fireEvent.click(buttons[1])

    await waitFor(() => {
      expect(purchaseVehicle).not.toHaveBeenCalled()
    })
  })
})
