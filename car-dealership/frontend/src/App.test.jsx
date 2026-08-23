import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App routing', () => {
  it('should render the login page at /login', () => {
    window.history.pushState({}, '', '/login')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: /login/i })
    ).toBeInTheDocument()
  })
})