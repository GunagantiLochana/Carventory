import { useAuth } from '../context/AuthContext'

function DashboardPage() {
  const { user, isAdmin, logout } = useAuth()

  return (
    <main>
      <h1>Dashboard</h1>

      {user && (
        <p>
          Role: {user.role}
        </p>
      )}

      {isAdmin && (
        <button type="button">
          Add Vehicle
        </button>
      )}

      <button type="button" onClick={logout}>
        Logout
      </button>
    </main>
  )
}

export default DashboardPage
