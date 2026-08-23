import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RegisterPage from './RegisterPage'
import { register } from '../services/authService'

vi.mock('../services/authService', () => ({
  register: vi.fn(),
}))

describe('RegisterPage', () => {
  it('should submit registration details', async () => {
    register.mockResolvedValue({ message: 'Registration successful' })

    render(<RegisterPage />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    })

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    })

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    })

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
})