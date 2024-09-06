import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { getUser, User } from "../lib/user";
import LoadingPage from "../pages/LoadingPage";

interface UserContextValue {
  user: User;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (uid: string) => {
    try {
      const user = await getUser(uid);
      setUser(user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigate("/login");
      } else {
        fetchUser(authUser.uid);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <LoadingPage />;
  if (!user) return;

  const contextValue: UserContextValue = {
    user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
