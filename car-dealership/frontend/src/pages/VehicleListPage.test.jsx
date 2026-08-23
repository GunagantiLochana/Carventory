import { render, screen, fireEvent } from '@testing-library/react'
import VehicleListPage from './VehicleListPage'

describe('VehicleListPage', () => {
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
      quantity: 5,
      imageUrl: 'https://example.com/civic.jpg',
    },
    {
      id: '3',
      make: 'BMW',
      model: 'X5',
      category: 'SUV',
      price: 60000,
      quantity: 2,
      imageUrl: 'https://example.com/x5.jpg',
    },
  ]

  test('renders available vehicles', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
    expect(screen.getAllByText('Sedan')).toHaveLength(2)
    expect(screen.getByText('$25,000')).toBeInTheDocument()
    expect(screen.getByText('$22,000')).toBeInTheDocument()
  })

  test('renders vehicle images', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    expect(screen.getByRole('img', { name: 'Toyota Camry' }))
      .toHaveAttribute('src', 'https://example.com/camry.jpg')

    expect(screen.getByRole('img', { name: 'Honda Civic' }))
      .toHaveAttribute('src', 'https://example.com/civic.jpg')
  })

  test('filters vehicles by make', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    fireEvent.change(screen.getByLabelText(/make/i), {
      target: { value: 'Toyota' },
    })

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.queryByText('Honda Civic')).not.toBeInTheDocument()
    expect(screen.queryByText('BMW X5')).not.toBeInTheDocument()
  })

  test('filters vehicles by model', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    fireEvent.change(screen.getByLabelText(/model/i), {
      target: { value: 'Civic' },
    })

    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
    expect(screen.queryByText('Toyota Camry')).not.toBeInTheDocument()
  })

  test('filters vehicles by category', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'SUV' },
    })

    expect(screen.getByText('BMW X5')).toBeInTheDocument()
    expect(screen.queryByText('Toyota Camry')).not.toBeInTheDocument()
    expect(screen.queryByText('Honda Civic')).not.toBeInTheDocument()
  })

  test('filters vehicles by maximum price', () => {
    render(<VehicleListPage vehicles={vehicles} />)

    fireEvent.change(screen.getByLabelText(/maximum price/i), {
      target: { value: '30000' },
    })

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('Honda Civic')).toBeInTheDocument()
    expect(screen.queryByText('BMW X5')).not.toBeInTheDocument()
  })
})
