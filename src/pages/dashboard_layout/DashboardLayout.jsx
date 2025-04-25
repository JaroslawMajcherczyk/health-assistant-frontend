import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import './DashboardLayout.scss'

export const DashboardLayout = () => {
  const { instance } = useMsal()
  const navigate = useNavigate()

  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: '/' })
  }

  return (
    <>
     <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h2>Health Assistant</h2>
        <button onClick={handleLogout}>Wyloguj</button>
      </header>

      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav>
            <ul>
              <li><NavLink to="/dashboard/patients">Zarządzanie Pacjentami</NavLink></li>
              <li><NavLink to="/dashboard/card">Karta Pacjenta</NavLink></li>
              <li><NavLink to="/dashboard/recordings">Dodanie Nagrań</NavLink></li>
            </ul>
          </nav>
        </aside>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  )
}
