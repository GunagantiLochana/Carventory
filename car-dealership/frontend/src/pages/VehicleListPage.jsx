function VehicleListPage({ vehicles = [] }) {
  return (
    <main>
      <h1>Vehicles</h1>

      <section>
        {vehicles.map((vehicle) => (
          <article key={vehicle.id}>
            <h2>
              {vehicle.make} {vehicle.model}
            </h2>

            <p>{vehicle.category}</p>

            <p>${vehicle.price.toLocaleString('en-US')}</p>

            <p>In stock: {vehicle.quantity}</p>
          </article>
        ))}
      </section>
    </main>
  )
}

export default VehicleListPage
