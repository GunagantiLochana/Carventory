import { render, screen } from '@testing-library/react'
import DashboardPage from './DashboardPage'

describe('DashboardPage', () => {
  test('renders the dashboard heading and vehicle inventory section', () => {
    render(<DashboardPage />)

    expect(
      screen.getByRole('heading', { name: /dashboard/i })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/vehicle inventory/i)
    ).toBeInTheDocument()
  })
})
