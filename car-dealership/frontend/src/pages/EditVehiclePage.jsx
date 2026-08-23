import { useState } from 'react'
import { updateVehicle } from '../services/vehicleService'

function EditVehiclePage({ vehicle }) {
  const [form, setForm] = useState({
    make: vehicle.make,
    model: vehicle.model,
    category: vehicle.category,
    price: vehicle.price,
    quantity: vehicle.quantity,
  })

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await updateVehicle(vehicle.id, {
      make: form.make,
      model: form.model,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    })
  }

  return (
    <main>
      <h1>Edit Vehicle</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="make">Make</label>
        <input
          id="make"
          name="make"
          value={form.make}
          onChange={handleChange}
        />

        <label htmlFor="model">Model</label>
        <input
          id="model"
          name="model"
          value={form.model}
          onChange={handleChange}
        />

        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
        />

        <button type="submit">Update Vehicle</button>
      </form>
    </main>
  )
}

export default EditVehiclePage
