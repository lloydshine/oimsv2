import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Account, Department, User } from "./globals";

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

export const createAccount = async (id: string, accountType: string) => {
  try {
    await setDoc(doc(db, "accounts", id), {
      accountType,
      onBoarded: false,
      dateCreated: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const getAccount = async (id: string): Promise<Account | null> => {
  try {
    const userDoc = await getDoc(doc(db, "accounts", id));
    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data(),
      } as Account;
    } else {
      return null;
    }
  } catch (e) {
    // Handle any errors
    console.error("Error fetching user:", e);
    return null;
  }
};

export const getAccountData = async (
  id: string,
  accountType: string // Use literal types to restrict to these values
): Promise<User | Department | null> => {
  try {
    const docRef = doc(
      db,
      accountType === "User" ? "users" : "departments",
      id
    );
    const dataDoc = await getDoc(docRef);

    if (dataDoc.exists()) {
      const data = dataDoc.data();

      if (accountType === "User") {
        return {
          id: dataDoc.id,
          ...data,
        } as User;
      } else {
        return {
          id: dataDoc.id,
          ...data,
        } as Department;
      }
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error fetching account data:", e);
    return null;
  }
};
