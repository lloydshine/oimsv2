import { HashRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LandingLayout from "./layouts/LandingLayout";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import EquipmentsPage from "./pages/dashboard/EquipmentsPage";
import EventsPage from "./pages/dashboard/EventsPage";
import EventCreatePage from "./pages/dashboard/EventCreatePage";
import EventsLayout from "./layouts/EventsLayout";
import EquipmentRequestPage from "./pages/request/EquipmentRequestPage";
import EquipmentsLayout from "./layouts/EquipmentsLayout";
import RequestLayout from "./layouts/RequestLayout";
import AdmissionRequestPage from "./pages/request/AdmissionRequestPage";
import AdmissionPage from "./pages/dashboard/AdmissionPage";
import AdmissionLandingPage from "./pages/landing/AdmissionLandingPage";
import EventsLandingPage from "./pages/landing/EventsLandingPage";
import EquipmentsLandingPage from "./pages/landing/EquipmentsLandingPage";
import DepartmentsPage from "./pages/dashboard/DepartmentsPage";
import StudentsPage from "./pages/dashboard/StudentsPage";
import CertificateRequestPage from "./pages/request/CertificateRequestPage";
import CertificateLandingPage from "./pages/landing/CertificateLandingPage";
import CertificatesPage from "./pages/dashboard/CertificatesPage";

export default function App() {
  return (
    <div className="transition-colors">
      <Toaster position="bottom-right" />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="admission" element={<AdmissionLandingPage />} />
            <Route path="events" element={<EventsLandingPage />} />
            <Route path="equipments" element={<EquipmentsLandingPage />} />
            <Route path="certificates" element={<CertificateLandingPage />} />
          </Route>
          <Route path="request" element={<RequestLayout />}>
            <Route path="admission" element={<AdmissionRequestPage />} />
            <Route path="certificate" element={<CertificateRequestPage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="admission" element={<AdmissionPage />} />
            <Route path="departments" element={<DepartmentsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="students" element={<StudentsPage />} />
            <Route path="equipments" element={<EquipmentsLayout />}>
              <Route index element={<EquipmentsPage />} />
              <Route path="request" element={<EquipmentRequestPage />} />
            </Route>
            <Route path="events" element={<EventsLayout />}>
              <Route index element={<EventsPage />} />
              <Route path="create" element={<EventCreatePage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
