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
    <main>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}

function DepartmentDashboard() {
  const { department } = useDepartment();
  return (
    <main>
      <pre>{JSON.stringify(department, null, 2)}</pre>
    </main>
  );
}
