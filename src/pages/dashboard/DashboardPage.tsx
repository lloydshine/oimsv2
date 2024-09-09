import { Link } from "react-router-dom";
import { useAccount } from "../../providers/AccountProvider";
import { useDepartment } from "../../providers/DepartmentProvider";
import { useUser } from "../../providers/UserProvider";

export default function DashboardPage() {
  const { account } = useAccount();
  if (account.accountType == "User") return <UserDashboard />;
  return <DepartmentDashboard />;
}

function UserDashboard() {
  const { user } = useUser();
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-red-950 text-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src={user.imageUrl || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{`${user.firstName} ${user.middleName} ${user.lastName}`}</h1>
            <p>{user.role}</p>
            <p>{user.assignedOffice}</p>
          </div>
        </div>
      </header>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Manage Departments</h2>
          <p className="mt-2 text-gray-600">View and manage all departments.</p>
          <Link
            to="/dashboard/departments"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Manage Departments
          </Link>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Manage Students</h2>
          <p className="mt-2 text-gray-600">View and manage student records.</p>
          <Link
            to="/dashboard/students"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Manage Students
          </Link>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Event Requests</h2>
          <p className="mt-2 text-gray-600">
            Review and process event requests.
          </p>
          <Link
            to="/dashboard/events/requests"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Event Requests
          </Link>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Equipment Requests</h2>
          <p className="mt-2 text-gray-600">
            Manage and approve equipment requests.
          </p>
          <Link
            to="/dashboard/equipment/requests"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Equipment Requests
          </Link>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">
            Career and Certificate Requests
          </h2>
          <p className="mt-2 text-gray-600">
            Handle career and certificate related requests.
          </p>
          <Link
            to="/dashboard/career-certificates/requests"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Career and Certificate Requests
          </Link>
        </div>
      </div>
    </div>
  );
}

function DepartmentDashboard() {
  const { department } = useDepartment();
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <header
        className={`flex items-center justify-between p-4 text-white rounded-lg shadow-md`}
        style={{ backgroundColor: department.color }}
      >
        <div className="flex items-center space-x-4">
          <img
            src={department.imageUrl || "https://via.placeholder.com/50"}
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{`${department.name}`}</h1>
            <p>{department.shortName}</p>
          </div>
        </div>
      </header>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Events Management */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Events Management</h2>
          <p className="mt-2 text-gray-600">Manage and review all events.</p>
          <Link
            to="/dashboard/events"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Events Management
          </Link>
        </div>

        {/* Student Management */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Student Management</h2>
          <p className="mt-2 text-gray-600">View and manage student records.</p>
          <Link
            to="/dashboard/students"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Student Management
          </Link>
        </div>

        {/* Student Penalties */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Student Penalties</h2>
          <p className="mt-2 text-gray-600">
            Review and manage student penalties.
          </p>
          <Link
            to="/dashboard/student-penalties"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Student Penalties
          </Link>
        </div>

        {/* Event Attendance */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Event Attendance</h2>
          <p className="mt-2 text-gray-600">
            Track and manage event attendance.
          </p>
          <Link
            to="/dashboard/event-attendance"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Event Attendance
          </Link>
        </div>

        {/* Department Management */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Department Management</h2>
          <p className="mt-2 text-gray-600">
            Manage departments and their details.
          </p>
          <Link
            to="/dashboard/departments"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Department Management
          </Link>
        </div>

        {/* Equipment Requests */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Equipment Requests</h2>
          <p className="mt-2 text-gray-600">
            Review and process equipment requests.
          </p>
          <Link
            to="/dashboard/equipment-requests"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Equipment Requests
          </Link>
        </div>

        {/* Event Requests */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold">Event Requests</h2>
          <p className="mt-2 text-gray-600">
            Review and manage event requests.
          </p>
          <Link
            to="/dashboard/event-requests"
            className="mt-4 inline-block px-4 py-2 bg-red-950 text-white rounded-lg hover:bg-red-950 transition-colors"
          >
            Go to Event Requests
          </Link>
        </div>
      </div>
    </div>
  );
}
