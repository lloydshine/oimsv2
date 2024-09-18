import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Student } from "./globals"; // Assume you have a Student type defined similarly to SchoolEvent
import { StudentFormData } from "../forms/StudentForm";

// Function to get all students
export const getStudents = async (): Promise<Student[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return students as Student[];
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Function to get a student by ID
export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const studentRef = doc(db, "students", id);
    const docSnap = await getDoc(studentRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Student;
    } else {
      console.log("No such student found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error;
  }
};

// Function to get students by department ID
export const getStudentsByDepartment = async (
  departmentId: string
): Promise<Student[]> => {
  try {
    // Create a query to filter students by departmentId
    const studentsQuery = query(
      collection(db, "students"),
      where("departmentId", "==", departmentId)
    );
    // Execute the query
    const querySnapshot = await getDocs(studentsQuery);
    // Map over the querySnapshot to create an array of Student objects
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return students as Student[];
  } catch (error) {
    console.error("Error fetching students by department:", error);
    return [];
  }
};

// Function to create a new student
export const createStudent = async (data: StudentFormData): Promise<void> => {
  try {
    await addDoc(collection(db, "students"), {
      ...data,
      dateAdded: serverTimestamp(),
    });
    console.log("Student created successfully!");
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

// Function to delete a student by ID
export const deleteStudent = async (id: string): Promise<void> => {
  try {
    const studentRef = doc(db, "students", id);
    await deleteDoc(studentRef);
    console.log("Student deleted successfully!");
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
