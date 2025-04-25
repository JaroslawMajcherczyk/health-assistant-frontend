import React, { useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { useNavigate, Outlet, Link } from 'react-router-dom'
import './Layout.scss'

export const Layout = () => {
  const { instance, accounts } = useMsal()
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await instance.loginRedirect()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    instance.logoutRedirect()
  }

  useEffect(() => {
    if (accounts.length > 0 && window.location.pathname === '/') {
      navigate('/dashboard')
    }
  }, [accounts, navigate])
  

  return (
    <>
      <nav>
        <ul>
          <li className="navbar-logo">
            <h1>LOGO</h1>
          </li>
          <div className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </div>
          <div className="navbar-buttons">
            {accounts.length > 0 ? (
              <li><button onClick={handleLogout}>Logout</button></li>
            ) : (
              <li><button onClick={handleLogin}>Login</button></li>
            )}
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}
