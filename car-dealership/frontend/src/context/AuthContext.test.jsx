import { renderHook } from '@testing-library/react'
import { AuthProvider, useAuth } from '../context/AuthContext'

describe('Admin role handling', () => {
  test('identifies an authenticated admin user', () => {
    localStorage.setItem('token', 'admin-token')
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: '1',
        name: 'Admin',
        email: 'admin@test.com',
        role: 'ADMIN',
      })
    )

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.user.role).toBe('ADMIN')
    expect(result.current.isAdmin).toBe(true)

    localStorage.clear()
  })
})
