import { useMsal } from '@azure/msal-react'
import { Navigate, useLocation } from 'react-router-dom'

export const RequireAuth = ({ children }) => {
  const { accounts } = useMsal()
  const location = useLocation()

  if (accounts.length === 0) {
    return <Navigate to="/" replace state={{ from: location }} />
  }

  return children
}
