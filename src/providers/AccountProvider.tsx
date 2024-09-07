import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { getAccount } from "../lib/account";
import LoadingPage from "../pages/LoadingPage";
import OnboardingPage from "../pages/auth/OnboardingPage";
import { UserProvider } from "./UserProvider";
import { DepartmentProvider } from "./DepartmentProvider";
import { Account } from "../lib/globals";

interface AccountContextValue {
  account: Account;
}

const AccountContext = createContext<AccountContextValue | undefined>(
  undefined
);

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};

export function AccountProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (!authUser) {
        navigate("/login");
      } else {
        const accountData = await getAccount(authUser.uid);
        setAccount(accountData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <LoadingPage />;
  if (!account) return;
  if (account?.onBoarded) return <OnboardingPage />;

  // Choose between UserProvider and DepartmentProvider based on account type
  return (
    <AccountContext.Provider value={{ account }}>
      {account.accountType === "User" ? (
        <UserProvider>{children}</UserProvider>
      ) : (
        <DepartmentProvider>{children}</DepartmentProvider>
      )}
    </AccountContext.Provider>
  );
}
