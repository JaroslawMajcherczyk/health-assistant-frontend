
import './App.scss'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Home } from "./pages/home/Home";
import { Blogs } from "./pages/blogs/Blogs";
import { Contact } from "./pages/contact/Contact";
import { NoPage } from "./pages/no_page/NoPage";
import { Dashboard } from './pages/dashboard/Dashboard';
import { DashboardLayout }  from './pages/dashboard_layout/DashboardLayout';
import { PatientManagement } from './pages/dashboard/patient_management/PatientManagement';
import { PatientCard }  from './pages/dashboard/patient_card/PatientCard';
import { RecordingsUpload } from './pages/dashboard/recordings_upload/RecordingsUpload';


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Publiczne strony z pełnym Layoutem */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>

        {/* Osobny layout dla dashboardu */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientManagement />} />
          <Route path="card" element={<PatientCard />} />
          <Route path="recordings" element={<RecordingsUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
