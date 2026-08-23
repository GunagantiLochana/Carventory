const API_URL = 'http://localhost:8080/api/vehicles'

export async function createVehicle(vehicle) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })

  if (!response.ok) {
    throw new Error('Failed to create vehicle')
  }

  return response.json()
}

export async function updateVehicle(id, vehicle) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(vehicle),
  })

  if (!response.ok) {
    throw new Error('Failed to update vehicle')
  }

  return response.json()
}

export async function deleteVehicle(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete vehicle')
  }

  return true
}

export async function purchaseVehicle(id) {
  const response = await fetch(`${API_URL}/${id}/purchase`, {
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Failed to purchase vehicle')
  }

  return response.json()
}
