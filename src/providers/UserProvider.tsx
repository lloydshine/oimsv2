import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAccountData } from "../lib/account";
import { User } from "../lib/globals";
import { auth } from "../lib/firebase";
import LoadingPage from "../pages/LoadingPage";

interface UserContextValue {
  user: User;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userData = await getAccountData(authUser.uid, "User");
        setUser(userData as User);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingPage />;
  if (!user) return;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
