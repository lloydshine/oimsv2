import { collection, getDocs } from "firebase/firestore";
import { Department } from "./globals";
import { db } from "./firebase";

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
