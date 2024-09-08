import { HashRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LandingLayout from "./layouts/LandingLayout";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import EquipmentsPage from "./pages/dashboard/EquipmentsPage";
import EventsPage from "./pages/dashboard/EventsPage";

export default function App() {
  return (
    <div className="transition-colors">
      <Toaster position="bottom-right" />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/equipments" element={<EquipmentsPage />} />
            <Route path="/dashboard/events" element={<EventsPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}
