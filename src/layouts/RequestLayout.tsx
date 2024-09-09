import { Outlet } from "react-router-dom";

export default function RequestLayout() {
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
}
