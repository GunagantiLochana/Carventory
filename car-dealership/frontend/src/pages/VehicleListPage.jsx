import { useEffect, useState } from 'react'
import {
  getVehicles,
  purchaseVehicle,
  deleteVehicle,
} from '../services/vehicleService'
import { useAuth } from '../context/AuthContext'

function VehicleListPage({ vehicles: initialVehicles }) {
  const [vehicles, setVehicles] = useState(initialVehicles || [])
  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [category, setCategory] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const { isAdmin } = useAuth()

  useEffect(() => {
    if (initialVehicles !== undefined) {
      return
    }

    getVehicles().then(setVehicles)
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

  const handlePurchase = async (vehicleId) => {
    await purchaseVehicle(vehicleId)
  }

  const handleDelete = async (vehicleId) => {
    await deleteVehicle(vehicleId)
  }

  return (
    <main>
      <h1>Vehicles</h1>

      {isAdmin && (
        <button type="button">
          Add Vehicle
        </button>
      )}

      <section>
        <label htmlFor="make">Make</label>
        <input
          id="make"
          value={make}
          onChange={(event) => setMake(event.target.value)}
        />

        <label htmlFor="model">Model</label>
        <input
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <label htmlFor="max-price">Maximum Price</label>
        <input
          id="max-price"
          type="number"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
        />
      </section>

      <section>
        {filteredVehicles.map((vehicle) => (
          <article key={vehicle.id}>
            {vehicle.imageUrl && (
              <img
                src={vehicle.imageUrl}
                alt={`${vehicle.make} ${vehicle.model}`}
              />
            )}

            <h2>
              {vehicle.make} {vehicle.model}
            </h2>

            <p>{vehicle.category}</p>

            <p>${vehicle.price.toLocaleString('en-US')}</p>

            <p>In stock: {vehicle.quantity}</p>

            <button
              type="button"
              onClick={() => handlePurchase(vehicle.id)}
              disabled={vehicle.quantity === 0}
            >
              Purchase
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={() => handleDelete(vehicle.id)}
              >
                Delete
              </button>
            )}
          </article>
        ))}
      </section>
    </main>
  )
}

export default VehicleListPage
