import AppHeader from '../components/AppHeader'
import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, isAdmin } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Overview
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back{user?.name ? `, ${user.name}` : ''}
              </h1>
              <p className="mt-2 text-slate-500">
                Manage your dealership inventory from one place.
              </p>
            </div>

            {isAdmin && (
              <a
                href="/vehicles/add"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                + Add Vehicle
              </a>
            )}
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href="/vehicles"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              ??
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Vehicle Inventory
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse, search, and manage vehicles in the dealership inventory.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
              View inventory ?
            </span>
          </a>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              ?
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Your current role
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {user?.role || 'User'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-xl">
              ?
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Management
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isAdmin
                ? 'You have administrator access to manage dealership inventory.'
                : 'Browse available vehicles and purchase inventory.'}
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
