import { Outlet } from "react-router-dom";
import { Topnav } from "../components/landing/Topnav";

export default function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-black p-2 text-white animate-pulse">AD</section>
      <Topnav />
      <main className="flex-1">
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
