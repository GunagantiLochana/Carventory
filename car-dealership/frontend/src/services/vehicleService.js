const API_URL = 'http://localhost:8080/api/vehicles'

function authHeaders() {
  const token = localStorage.getItem('token')

  return token
    ? { Authorization: `Bearer ${token}` }
    : {}
}

export async function getVehicles() {
  const response = await fetch(API_URL, {
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to load vehicles')
  }

  return response.json()
}

export async function createVehicle(vehicle) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
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
      ...authHeaders(),
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
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to delete vehicle')
  }

  return true
}

export async function purchaseVehicle(id) {
  const response = await fetch(`${API_URL}/${id}/purchase`, {
    method: 'POST',
    headers: authHeaders(),
  })

  if (!response.ok) {
    throw new Error('Failed to purchase vehicle')
  }

  return response.json()
}
