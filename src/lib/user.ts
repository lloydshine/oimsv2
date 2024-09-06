import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const createUser = async () => {};

export const getUser = async (id: string): Promise<User | null> => {
  try {
    const userDoc = await getDoc(doc(db, "users", id));
    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data(),
      } as User;
    } else {
      return null;
    }
  } catch (e) {
    // Handle any errors
    console.error("Error fetching user:", e);
    return null;
  }
};

export enum UserType {
  Internal = "Internal",
  External = "External",
}

export enum InternalRole {
  Admin = "Admin",
  Assistant = "Assistant",
}

export enum ExternalRole {
  Dean = "Dean",
  Instructor = "Instructor",
  President = "President",
  Secretary = "Secretary",
  VicePresident = "VicePresident",
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  imageUrl?: string;
  assignedLocation: string;
  dateJoined: Timestamp;
  userType: UserType;
  role: InternalRole | ExternalRole;
}
