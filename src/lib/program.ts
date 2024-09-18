import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { Program } from "./globals"; // Assuming you have the Program interface
import { ProgramFormData } from "../forms/ProgramForm";

// Create a new program
export const createProgram = async (data: ProgramFormData): Promise<void> => {
  try {
    await addDoc(collection(db, "programs"), {
      name: data.name,
      shortName: data.shortName,
      departmentId: data.departmentId,
    });
    console.log("Program created successfully!");
  } catch (error) {
    console.error("Error creating program:", error);
    throw error;
  }
};

// Update an existing program
export const updateProgram = async (
  id: string,
  data: ProgramFormData
): Promise<void> => {
  try {
    const programRef = doc(db, "programs", id);
    await updateDoc(programRef, {
      name: data.name,
      shortName: data.shortName,
      departmentId: data.departmentId,
    });
    console.log("Program updated successfully!");
  } catch (error) {
    console.error("Error updating program:", error);
    throw error;
  }
};

// Delete a program by ID
export const deleteProgram = async (id: string): Promise<void> => {
  try {
    const programRef = doc(db, "programs", id);
    await deleteDoc(programRef);
    console.log("Program deleted successfully!");
  } catch (error) {
    console.error("Error deleting program:", error);
    throw error;
  }
};

// Get all programs
export const getPrograms = async (): Promise<Program[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "programs"));
    const programs: Program[] = [];
    querySnapshot.forEach((doc) => {
      programs.push({ id: doc.id, ...doc.data() } as Program);
    });
    return programs;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};
