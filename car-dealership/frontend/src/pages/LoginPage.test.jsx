import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoginPage from './LoginPage'

describe('LoginPage', () => {
  it('should display email and password fields with a login button', () => {
    render(<LoginPage />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /login/i })
    ).toBeInTheDocument()
  })
})