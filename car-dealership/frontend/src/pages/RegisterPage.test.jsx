import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import RegisterPage from './RegisterPage'

describe('RegisterPage', () => {
  it('should display registration fields and a register button', () => {
    render(<RegisterPage />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register/i })
    ).toBeInTheDocument()
  })
})