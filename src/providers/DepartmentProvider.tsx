import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getAccountData } from "../lib/account";
import { Department } from "../lib/globals";
import { auth } from "../lib/firebase";
import LoadingPage from "../pages/LoadingPage";

interface DepartmentContextValue {
  department: Department;
}

const DepartmentContext = createContext<DepartmentContextValue | undefined>(
  undefined
);

export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error("useDepartment must be used within a DepartmentProvider");
  }
  return context;
};

export const DepartmentProvider = ({ children }: { children: ReactNode }) => {
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const departmentData = await getAccountData(authUser.uid, "Department");
        setDepartment(departmentData as Department);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingPage />;

  if (!department) return;

  return (
    <DepartmentContext.Provider value={{ department }}>
      {children}
    </DepartmentContext.Provider>
  );
};
