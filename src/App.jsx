
import './App.scss'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Home } from "./pages/home/Home";
import { Contact } from "./pages/contact/Contact";
import { NoPage } from "./pages/no_page/NoPage";
import { Dashboard } from './pages/dashboard/Dashboard';
import { DashboardLayout }  from './pages/dashboard_layout/DashboardLayout';
import { PatientManagement } from './pages/dashboard/patient_management/PatientManagement';
import { PatientCard }  from './pages/dashboard/patient_card/PatientCard';
import { RecordingsUpload } from './pages/dashboard/recordings_upload/RecordingsUpload';
import About from './pages/about/About';
import ScrollToTop from './pages/scroll_to_top/ScrollToTop';
import { Profile } from './pages/dashboard/profile/Profile';
import { RequireAuth } from './RequireAuth';


function App() {
  return (
    <>
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        {/* Publiczne strony z pełnym Layoutem */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>

        {/* Osobny layout dla dashboardu */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<PatientManagement />} />
        <Route path="card" element={<PatientCard />} />
        <Route path="recordings" element={<RecordingsUpload />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
