import { Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth()

  // still checking token → don't redirect
  if (loading) return <div>Loading...</div>

  // checked → no user
  if (!user) return <Navigate to="/login" />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}