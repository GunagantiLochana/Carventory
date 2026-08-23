import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import DashboardPage from './DashboardPage'

const logout = vi.fn()

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: {
      role: 'ADMIN',
    },
    isAdmin: true,
    logout,
  }),
}))

describe('DashboardPage logout', () => {
  test('logs out the authenticated user', () => {
    render(<DashboardPage />)

    fireEvent.click(
      screen.getByRole('button', { name: /logout/i })
    )

    expect(logout).toHaveBeenCalled()
  })
})
