import { auth } from "../../lib/firebase";
import { useAccount } from "../../providers/AccountProvider";
import { useUser } from "../../providers/UserProvider";

export default function DashboardPage() {
  const { user } = useUser();
  const { account } = useAccount();

  return (
    <div>
      DashboardPage
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <pre className="max-w-[50rem]"></pre>
      <button
        onClick={() => auth.signOut()}
        className="bg-red-950 text-white rounded-lg px-4 py-2 border-2 mt-auto hover:bg-white hover:text-red-950 transition-colors"
      >
        Signout
      </button>
    </div>
  );
}
