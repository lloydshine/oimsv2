import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { AdmissionFormData } from "../forms/AdmissionForm";
import { db } from "./firebase";
import { Admission } from "./globals";

export const createAdmission = async (
  data: AdmissionFormData,
  admissionNumber: string
) => {
  try {
    await addDoc(collection(db, "admissions"), {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      email: data.email,
      contactNumber: data.contactNumber,
      status: "Pending",
      admissionNumber: admissionNumber,
      fileUrls: data.fileUrls,
      dateSubmitted: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const getAdmissions = async (
  admissionNumber: string
): Promise<Admission[]> => {
  try {
    const admissionsQuery = query(
      collection(db, "admissions"),
      where("admissionNumber", "==", admissionNumber)
    );
    const querySnapshot = await getDocs(admissionsQuery);
    const admissions = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return admissions as Admission[];
  } catch (error) {
    console.error("Error fetching items:", error);
    return [];
  }
};
