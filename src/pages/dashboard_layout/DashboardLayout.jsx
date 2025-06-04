import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import './DashboardLayout.scss'
import HealthAssistantLogo from '../../assets/Health-Assistant-Logo.png'
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
      <img src={HealthAssistantLogo} alt="Health Assistance Logo" className="logo" />
      <div className="header-buttons">
        <button className="profile-button" onClick={() => navigate('/dashboard/profile')}>Profil</button>
        <button onClick={handleLogout}>Wyloguj</button>
      </div>
    </header>


      <div className="dashboard-layout">
        <aside className="sidebar">   
              <ul>
                <li><NavLink to="/dashboard/patients">Zarządzanie Pacjentami</NavLink></li>
                <li><NavLink to="/dashboard/card">Karta Pacjenta</NavLink></li>
                <li><NavLink to="/dashboard/recordings">Dodanie Nagrań</NavLink></li>
                <li><NavLink to="/dashboard/records">Zarządzanie Nagraniami</NavLink></li>
              </ul>
        </aside>
        <main className="dashboard-content">
          <Outlet />
          
        </main>
      </div>
    </div>
    </>
  )
}
