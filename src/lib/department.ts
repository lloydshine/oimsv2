import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { Department } from "./globals";
import { db } from "./firebase";
import { useCallback, useEffect, useState } from "react";

export const getDepartments = async (): Promise<Department[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "departments"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return items as Department[];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const getDepartmentById = async (
  id: string
): Promise<Department | null> => {
  try {
    const equipmentRef = doc(db, "departments", id);
    const docSnap = await getDoc(equipmentRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Department;
    } else {
      console.log("No such department found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching department by ID:", error);
    throw error;
  }
};

export function useDepartments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  const fetchDepartments = useCallback(async () => {
    const departments = await getDepartments();
    setDepartments(departments);
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    fetchDepartments,
  };
}
