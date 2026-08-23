import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RegisterPage from './RegisterPage'
import { register } from '../services/authService'

vi.mock('../services/authService', () => ({
  register: vi.fn(),
}))

describe('RegisterPage', () => {
  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    })

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    })
  }

  it('should submit registration details', async () => {
    register.mockResolvedValue({ message: 'Registration successful' })

    render(<RegisterPage />)

    fillForm()

    fireEvent.click(
      screen.getByRole('button', { name: /register/i })
    )

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
      })
    })
  })

  it('should display a success message after registration', async () => {
    register.mockResolvedValue({
      message: 'Registration successful',
    })

    render(<RegisterPage />)

    fillForm()

    fireEvent.click(
      screen.getByRole('button', { name: /register/i })
    )

    expect(
      await screen.findByText(/registration successful/i)
    ).toBeInTheDocument()
  })

  it('should display an error message when registration fails', async () => {
    register.mockRejectedValue(new Error('Email already exists'))

    render(<RegisterPage />)

    fillForm()

    fireEvent.click(
      screen.getByRole('button', { name: /register/i })
    )

    expect(
      await screen.findByText(/email already exists/i)
    ).toBeInTheDocument()
  })
})