import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export const createNotification = async (
  message: string,
  link: string,
  fromId?: string,
  toId?: string
) => {
  try {
    await addDoc(collection(db, "equipments"), {
      toId,
      fromId,
      message,
      link,
      viewd: false,
      dateNotified: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};
