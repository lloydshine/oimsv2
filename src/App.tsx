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

export default function App() {
  return (
    <div className="transition-colors">
      <Toaster position="bottom-right" />
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="equipments" element={<EquipmentsPage />} />
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
