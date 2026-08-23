import { act, renderHook } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('provides unauthenticated state when no token exists', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.token).toBeNull()
  })

  test('logs out and removes the token', () => {
    localStorage.setItem('token', 'test-jwt-token')

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    })

    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(localStorage.getItem('token')).toBeNull()
    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })
})