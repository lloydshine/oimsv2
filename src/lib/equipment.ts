import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Equipment, EquipmentRequest } from "./globals";
import { db } from "./firebase";
import { ItemFormData } from "../forms/ItemForm";
import { EquipmentRequestData } from "../forms/EquipmentRequestForm";

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
    const equipmentRef = doc(db, "equipments", id);
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
    const equipmentRef = doc(db, "equipments", id);
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

export const getAvailableEquipments = async (): Promise<Equipment[]> => {
  try {
    // Query to get documents where isAvailable is true
    const q = query(
      collection(db, "equipments"),
      where("isAvailable", "==", true)
    );
    const querySnapshot = await getDocs(q);
    // Map the results to an array of equipment
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return items as Equipment[];
  } catch (error) {
    console.error("Error fetching available equipments:", error);
    return [];
  }
};

export const createEquipmentRequest = async (data: EquipmentRequestData) => {
  try {
    const ref = await addDoc(collection(db, "equipmentRequests"), {
      eventId: data.eventId || null,
      departmentId: data.departmentId || null,
      status: "Pending",
      dateRequested: serverTimestamp(),
      dateClaimed: null,
      dateToBeReturned: null,
      requestedEquipments: data.requestedEquipments.map((item) => ({
        ...item,
        isReturned: false,
        dateReturned: null,
      })),
    });
    if (data.eventId) {
      await updateDoc(doc(db, "events", data.eventId), {
        requestId: ref.id,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const getEventEquipmentRequest = async (
  id: string
): Promise<EquipmentRequest | null> => {
  try {
    const equipmentRef = doc(db, "equipmentRequests", id);
    const docSnap = await getDoc(equipmentRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as EquipmentRequest;
    } else {
      console.log("No such equipment found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    throw error;
  }
};
