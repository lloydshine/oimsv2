import { useUser } from "../../providers/UserProvider";
import { auth } from "../../lib/firebase";
import { ExternalRole } from "../../lib/globals";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div>
      DashboardPage
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button
        onClick={() => auth.signOut()}
        className="bg-red-950 text-white rounded-lg px-4 py-2 border-2 mt-auto hover:bg-white hover:text-red-950 transition-colors"
      >
        Signout
      </button>
    </div>
  );
}
