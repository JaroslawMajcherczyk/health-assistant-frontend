import React, { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { useNavigate, Outlet, Link } from 'react-router-dom'
import HealthAssistantLogo from '../../assets/Health-Assistant-Logo.png'
import './Layout.scss'

export const Layout = () => {
  const { instance, accounts } = useMsal()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

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

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <ul>
          <li className="navbar-logo">
            <img src={HealthAssistantLogo} alt="Health Assistance Logo" className="logo" />
          </li>
          <div className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
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
