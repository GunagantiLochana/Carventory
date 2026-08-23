import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import ProtectedRoute from './ProtectedRoute'

describe('ProtectedRoute', () => {
  test('redirects unauthenticated users to login', () => {
    localStorage.clear()

    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <h1>Dashboard</h1>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<h1>Login</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    )

    expect(
      screen.getByRole('heading', { name: /login/i })
    ).toBeInTheDocument()

    expect(
      screen.queryByRole('heading', { name: /dashboard/i })
    ).not.toBeInTheDocument()
  })
})