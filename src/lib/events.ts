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
import { db } from "./firebase";
import { SchoolEvent } from "./globals";
import { EventFormData } from "../forms/EventForm";

// Function to create a new event
export const createEvent = async (data: EventFormData): Promise<void> => {
  try {
    await addDoc(collection(db, "events"), {
      name: data.name,
      description: data.description,
      departmentId: data.departmentId,
      startTime: data.startTime,
      endTime: data.endTime,
      hasEquipmentRequest: false,
      dateCreated: serverTimestamp(),
    });
    console.log("Event created successfully!");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

// Function to get all events
export const getEvents = async (): Promise<SchoolEvent[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return events as SchoolEvent[];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

// Function to update an event
export const updateEvent = async (
  id: string,
  data: EventFormData
): Promise<void> => {
  try {
    const eventRef = doc(db, "events", id);
    await updateDoc(eventRef, {
      name: data.name,
      description: data.description,
      departmentId: data.departmentId,
      startTime: data.startTime,
      endTime: data.endTime,
    });
    console.log("Event updated successfully!");
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Function to delete an event by ID
export const deleteEvent = async (id: string): Promise<void> => {
  try {
    const eventRef = doc(db, "events", id);
    await deleteDoc(eventRef);
    console.log("Event deleted successfully!");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// Function to get a single event by ID
export const getEventById = async (id: string): Promise<SchoolEvent | null> => {
  try {
    const eventRef = doc(db, "events", id);
    const docSnap = await getDoc(eventRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as SchoolEvent;
    } else {
      console.log("No such event found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error;
  }
};

export const getDepartmentEvents = async (
  departmentId: string
): Promise<SchoolEvent[]> => {
  try {
    // Create a query to filter events by departmentId
    const eventsQuery = query(
      collection(db, "events"),
      where("departmentId", "==", departmentId)
    );
    // Execute the query
    const querySnapshot = await getDocs(eventsQuery);
    // Map over the querySnapshot to create an array of SchoolEvent objects
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return events as SchoolEvent[];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
