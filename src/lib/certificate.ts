import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { CertificateFormData } from "../forms/CertificateForm";
import { db } from "./firebase";
import { CertificateRequest } from "./globals";
import { useCallback, useEffect, useState } from "react";

export const certificates = [
  { name: "Good Moral Certificate", purposes: ["Graduating Student"] },
];

export const createCertificateRequest = async (data: CertificateFormData) => {
  try {
    await addDoc(collection(db, "certificateRequests"), {
      ...data,
      dateRequested: serverTimestamp(),
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};

export const getCertificateRequests = async (): Promise<
  CertificateRequest[]
> => {
  try {
    const querySnapshot = await getDocs(collection(db, "certificateRequests"));
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as object),
    }));
    return items as CertificateRequest[];
  } catch (error) {
    console.error("Error fetching requests:", error);
    return [];
  }
};

export function useCertificates() {
  const [requests, setRequests] = useState<CertificateRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    try {
      const requests = await getCertificateRequests();
      setRequests(requests);
    } catch (error) {
      console.log("Error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    fetchRequests,
    loading,
  };
}
