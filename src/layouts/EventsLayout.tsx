import { Outlet } from "react-router-dom";

export default function EventsLayout() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
