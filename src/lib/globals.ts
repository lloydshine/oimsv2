import { Timestamp } from "firebase/firestore";

export interface User {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  contactNumber: string;
  imageUrl?: string;
  assignedOffice: string;
  role: string;
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
  description: string;
  imageUrl?: string;
}

export interface Account {
  id: string;
  onBoarded: boolean;
  accountType: string;
  dateCreated: Timestamp;
}
