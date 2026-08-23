import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginApi } from '../services/authService'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login: loginUser } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setError('')

    try {
      console.log('LOGIN: submitting')

      const response = await loginApi({
        email,
        password,
      })

      console.log('LOGIN: API response received', response)

      if (response.token && response.user) {
        console.log('LOGIN: updating AuthContext')

        loginUser(response.token, response.user)

        console.log('LOGIN: navigating to dashboard')

        navigate('/dashboard')

        console.log('LOGIN: navigate called')
      } else {
        console.log('LOGIN: missing token or user')
        setError('Login response did not contain authentication data.')
      }
    } catch (error) {
      console.error('LOGIN: failed', error)
      setError(error.message)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white shadow-lg shadow-blue-600/30">
            C
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Carventory
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Car dealership inventory management
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-white p-8 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Login
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign in to manage your inventory.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
            >
              Login
            </button>
          </div>

          {message && (
            <p className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              {message}
            </p>
          )}

          {error && (
            <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <a
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create account
            </a>
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Secure inventory management system
        </p>
      </section>
    </main>
  )
}

export default LoginPage
