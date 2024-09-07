import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { User } from "./globals";

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

export const register = async (email: string, password: string) => {
  try {
    const register = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, userId: register.user.uid };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const createUser = async (
  id: string,
  firstName: string,
  middleName: string,
  lastName: string,
  contactNumber: string
) => {
  try {
    await setDoc(doc(db, "users", id), {
      firstName,
      middleName,
      lastName,
      contactNumber,
      imageUrl: "",
      organizationId: "",
      dateJoined: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

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
