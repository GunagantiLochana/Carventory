import { render, screen } from '@testing-library/react'
import VehicleListPage from './VehicleListPage'

describe('VehicleListPage', () => {
  test('renders available vehicles', () => {
    const vehicles = [
      {
        id: '1',
        make: 'Toyota',
        model: 'Camry',
        category: 'Sedan',
        price: 25000,
        quantity: 3,
      },
      {
        id: '2',
        make: 'Honda',
        model: 'Civic',
        category: 'Sedan',
        price: 22000,
        quantity: 5,
      },
    ]

    render(<VehicleListPage vehicles={vehicles} />)

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
    expect(screen.getAllByText('Sedan')).toHaveLength(2)
    expect(screen.getByText('$25,000')).toBeInTheDocument()
    expect(screen.getByText('$22,000')).toBeInTheDocument()
  })
})
