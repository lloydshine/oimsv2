import { Outlet } from "react-router-dom";
import { UserProvider } from "../providers/UserProvider";
import { Topbar } from "../components/dashboard/Topbar";
import { Sidebar } from "../components/dashboard/Sidebar";
import { useState } from "react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);
  const handleToggle = (toggle: boolean) => {
    setOpen(toggle);
  };

  return (
    <UserProvider>
      <main>
        <Topbar handleToggle={handleToggle} open={open} />
        <section className="h-screen flex pt-20 pb-5">
          <Sidebar open={open} />
          <div className="flex-1 flex max-h-screen overflow-y-auto p-10">
            <Outlet />
          </div>
        </section>
      </main>
    </UserProvider>
  );
}
