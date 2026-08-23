import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AppHeader() {
  const auth = useAuth()
  const user = auth?.user
  const isAdmin = auth?.isAdmin ?? false
  const logout = auth?.logout ?? (() => {})
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="/dashboard"
          className="flex items-center gap-3"
          aria-label="Carventory dashboard"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg text-white shadow-sm">
            ??
          </span>

          <div>
            <p className="text-lg font-bold tracking-tight text-slate-900">
              Carventory
            </p>
            <p className="hidden text-xs font-medium text-slate-500 sm:block">
              Dealership Inventory
            </p>
          </div>
        </a>

        <nav className="flex items-center gap-2 sm:gap-4">
          <a
            href="/dashboard"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Dashboard
          </a>

          <a
            href="/vehicles"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Inventory
          </a>

          {isAdmin && (
            <a
              href="/vehicles/add"
              className="hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:inline-flex"
            >
              + Add Vehicle
            </a>
          )}

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || 'User'}
            </p>
            <p className="text-xs text-slate-500">
              {user?.role || 'User'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader
