import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import VehicleListPage from './VehicleListPage'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

import { useAuth } from '../context/AuthContext'

describe('VehicleListPage admin controls', () => {
  test('shows admin controls only for admin users', () => {
    useAuth.mockReturnValue({
      user: {
        id: '1',
        name: 'Admin',
        email: 'admin@test.com',
        role: 'ADMIN',
      },
      isAdmin: true,
      isAuthenticated: true,
    })

    render(<VehicleListPage vehicles={[]} />)

    expect(
      screen.getByRole('button', { name: /add vehicle/i })
    ).toBeInTheDocument()
  })
})
