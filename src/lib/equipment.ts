import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { Equipment } from "./globals";
import { db } from "./firebase";
import { ItemFormData } from "../forms/ItemForm";

export const createEquipment = async (
  data: ItemFormData,
  imageUrl: string | null
) => {
  try {
    await addDoc(collection(db, "equipments"), {
      name: data.name,
      brand: data.brand,
      price: data.price,
      quantity: data.quantity,
      imageUrl,
      isAvailable: data.isAvailable,
      dateBought: data.dateBought,
      dateJoined: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const getEquipments = async (): Promise<Equipment[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "equipments"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return items as Equipment[];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};

export const updateEquipment = async (
  id: string,
  data: ItemFormData,
  imageUrl: string | null
): Promise<void> => {
  try {
    const equipmentRef = doc(db, "equipments", id);
    await updateDoc(equipmentRef, { ...data, imageUrl });
    console.log("Equipment updated successfully!");
  } catch (error) {
    console.error("Error updating equipment:", error);
    throw error;
  }
};

export const deleteEquipment = async (id: string): Promise<void> => {
  try {
    const equipmentRef = doc(db, "inventory", id);
    await deleteDoc(equipmentRef);
    console.log("Equipment deleted successfully!");
  } catch (error) {
    console.error("Error deleting equipment:", error);
    throw error;
  }
};

export const getEquipmentById = async (
  id: string
): Promise<Equipment | null> => {
  try {
    const equipmentRef = doc(db, "inventory", id);
    const docSnap = await getDoc(equipmentRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Equipment;
    } else {
      console.log("No such equipment found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    throw error;
  }
};
