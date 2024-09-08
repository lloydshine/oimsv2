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
  color: string;
}

export interface Account {
  id: string;
  onBoarded: boolean;
  accountType: string;
  dateCreated: Timestamp;
}

export interface Equipment {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  isAvailable: boolean;
  imageUrl: string;
  price: number;
  dateBought: string;
  dateAdded: Timestamp;
}
