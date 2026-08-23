import { useEffect, useState } from 'react'
import {
  getVehicles,
  purchaseVehicle,
  deleteVehicle,
} from '../services/vehicleService'
import { useAuth } from '../context/AuthContext'
import AppHeader from '../components/AppHeader'

function VehicleListPage({ vehicles: initialVehicles }) {
  const [vehicles, setVehicles] = useState(initialVehicles ?? [])
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(!initialVehicles)

  const { isAdmin } = useAuth()

  useEffect(() => {
    if (initialVehicles) {
      setVehicles(initialVehicles)
      return
    }

    const loadVehicles = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getVehicles()
        setVehicles(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadVehicles()
  }, [initialVehicles])

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesMake =
      !make ||
      vehicle.make.toLowerCase().includes(make.toLowerCase())

    const matchesModel =
      !model ||
      vehicle.model.toLowerCase().includes(model.toLowerCase())

    const matchesCategory =
      !category ||
      vehicle.category.toLowerCase().includes(category.toLowerCase())

    const matchesPrice =
      !maxPrice || vehicle.price <= Number(maxPrice)

    return (
      matchesMake &&
      matchesModel &&
      matchesCategory &&
      matchesPrice
    )
  })

  const clearFilters = () => {
    setMake('')
    setModel('')
    setCategory('')
    setMaxPrice('')
  }

  const handlePurchase = async (vehicleId) => {
    await purchaseVehicle(vehicleId)
  }

  const handleDelete = async (vehicleId) => {
    await deleteVehicle(vehicleId)
    setVehicles((current) =>
      current.filter((vehicle) => vehicle.id !== vehicleId)
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                Inventory
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Vehicles
              </h1>

              <p className="mt-2 text-slate-500">
                Browse and manage dealership inventory.
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

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Search inventory
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Filter vehicles by make, model, category, or price.
              </p>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="self-start rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label
                htmlFor="make"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Make
              </label>

              <input
                id="make"
                value={make}
                onChange={(event) => setMake(event.target.value)}
                placeholder="Toyota"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="model"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Model
              </label>

              <input
                id="model"
                value={model}
                onChange={(event) => setModel(event.target.value)}
                placeholder="Camry"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category
              </label>

              <input
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Sedan"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="max-price"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Maximum Price
              </label>

              <input
                id="max-price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="50000"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>
        </section>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
            <span className="font-bold">!</span>
            <div>
              <p className="font-semibold">Unable to load inventory</p>
              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Available Vehicles
          </h2>

          {!loading && (
            <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-600">
              {filteredVehicles.length} vehicles
            </span>
          )}
        </div>

        {loading ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
            <p className="text-sm font-medium text-slate-500">
              Loading vehicles...
            </p>
          </section>
        ) : filteredVehicles.length === 0 ? (
          <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
              ??
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              No vehicles found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              There are no vehicles matching your current filters. Try
              adjusting your search criteria.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </section>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((vehicle) => (
              <article
                key={vehicle.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {vehicle.imageUrl ? (
                  <img
                    src={vehicle.imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <div className="text-center">
                      <div className="text-5xl">??</div>
                      <p className="mt-2 text-xs font-medium text-slate-400">
                        Vehicle image unavailable
                      </p>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {vehicle.make} {vehicle.model}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {vehicle.category}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        vehicle.quantity > 0
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {vehicle.quantity > 0 ? 'Available' : 'Sold out'}
                    </span>
                  </div>

                  <p className="mb-1 text-2xl font-bold text-slate-900">
                    ${vehicle.price.toLocaleString('en-US')}
                  </p>

                  <p className="mb-5 text-sm text-slate-500">
                    In stock: {vehicle.quantity}
                  </p>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => handlePurchase(vehicle.id)}
                      disabled={vehicle.quantity === 0}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      Purchase
                    </button>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDelete(vehicle.id)}
                        className="rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

export default VehicleListPage
