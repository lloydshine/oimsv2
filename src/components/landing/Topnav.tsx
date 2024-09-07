import { Link } from "react-router-dom";

export function Topnav() {
  return (
    <nav className="sticky top-0 flex px-6 py-4 items-center text-white bg-red-950 justify-between z-50">
      <div className="flex items-center gap-4 flex-1">
        <img src="/logo.png" alt="logo" className="w-10 animate-bounce" />
        <h1 className="font-bold">OIMS</h1>
      </div>
      <div className="md:flex items-center gap-12 flex-1 justify-center hidden">
        <Link to={"/"}>Admission</Link>
        <Link to={"/"}>Events</Link>
        <Link to={"/"}>Career</Link>
        <Link to={"/"}>Equipments</Link>
        <Link to={"/"}>Certificates</Link>
      </div>
      <div className="flex-1 flex justify-end">
        <button className="px-6 py-2 rounded-md bg-white text-red-950">
          <Link to="/dashboard">Login</Link>
        </button>
      </div>
    </nav>
  );
}
