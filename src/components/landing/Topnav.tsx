import { Link } from "react-router-dom";

export function Topnav() {
  return (
    <nav className="sticky top-0 flex p-6 items-center text-white bg-red-950 justify-between z-50">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-10 animate-bounce" />
        <h1 className="font-bold">OIMS</h1>
      </div>
      <div>
        <button>
          <Link to="/dashboard">Login</Link>
        </button>
      </div>
    </nav>
  );
}
