import { Link, useLocation } from "react-router-dom";
import { useAccount } from "../../providers/AccountProvider";
import { useDepartment } from "../../providers/DepartmentProvider";
import { useUser } from "../../providers/UserProvider";
import {
  Blocks,
  Calendar,
  ChartBar,
  Hand,
  HouseIcon,
  HousePlusIcon,
  PaperclipIcon,
  School2Icon,
  User2,
  Users2,
} from "lucide-react";
import { auth } from "../../lib/firebase";
import { isActiveLink } from "../../lib/utils";

export function Sidebar({ open }: { open: boolean }) {
  const position = open ? "left-0" : "-left-[20rem]";
  const { account } = useAccount();
  return (
    <>
      {open && (
        <div className="fixed h-screen md:hidden z-30 w-screen bg-black/80"></div>
      )}
      <div
        className={`${position} z-40 fixed md:static transition-all duration-300 w-[18rem] border-r-2 h-screen md:h-auto max-h-screen overflow-y-auto gap-8 flex flex-col bg-white`}
      >
        {account.accountType == "User" ? <UserPanel /> : <DepartmentPanel />}
        <div className="w-full p-5 mt-auto">
          <button
            onClick={() => auth.signOut()}
            className="w-full border-2 border-red-950 text-red-950 rounded-lg p-1 hover:bg-red-950 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}

export function UserPanel() {
  const { user } = useUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section className="flex flex-col">
      <div className="flex m-2 items-center justify-center rounded-md border-2 p-2 gap-2 bg-red-950">
        <h1 className="text-white font-bold">{user.assignedOffice}</h1>
        <p className="text-white">| {user.role}</p>
      </div>
      <div className="w-full flex flex-col">
        <Link
          to="/dashboard"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <ChartBar />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/dashboard/profile"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/profile")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <User2 />
          <p>Profile</p>
        </Link>
        <Link
          to="/dashboard/admission"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/admission")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <School2Icon />
          <p>Admission</p>
          <p>{user.assignedOffice === "OSAS" ? "2" : "1"}</p>
        </Link>
        <Link
          to="/dashboard/equipments"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/equipments")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <Blocks />
          <p>Equipments</p>
        </Link>
        <Link
          to="/dashboard/certificates"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/certificates")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <PaperclipIcon />
          <p>Certificates</p>
        </Link>
        <Link
          to="/dashboard/department"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/department")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <HousePlusIcon />
          <p>Department</p>
        </Link>
        <Link
          to="/dashboard/students"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/students")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <Users2 />
          <p>Students</p>
        </Link>
      </div>
    </section>
  );
}

export function DepartmentPanel() {
  const { department } = useDepartment();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section>
      <div
        className={`flex m-2 items-center justify-center rounded-md border-2 p-2`}
        style={{ backgroundColor: department.color }}
      >
        <h1 className="text-white font-bold">{department.shortName}</h1>
      </div>
      <div className="w-full flex flex-col">
        <Link
          to="/dashboard"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <ChartBar />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/dashboard/department"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/department")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <HouseIcon />
          <p>Department</p>
        </Link>
        <Link
          to="/dashboard/events"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/events")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <Calendar />
          <p>Events</p>
        </Link>
        <Link
          to="/dashboard/equipments"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/equipments")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <Hand />
          <p>Request Equipments</p>
        </Link>
        <Link
          to="/dashboard/students"
          className={`p-4 flex items-center gap-4 hover:bg-gray-100 ${
            isActiveLink(currentPath, "/dashboard/students")
              ? "text-red-950 font-semibold"
              : ""
          }`}
        >
          <Users2 />
          <p>Students</p>
        </Link>
      </div>
    </section>
  );
}
