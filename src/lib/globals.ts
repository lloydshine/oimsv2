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

export interface EquipmentRequest {
  id: string; // Unique ID for the request
  eventId?: string;
  departmentId: string;
  dateClaimed: Timestamp;
  dateRequested: Timestamp;
  dateToBeReturned: Date;
  dateReturned?: Date;
  status: string;
  requestedEquipments: RequestedEquipment[];
}

export interface RequestedEquipment {
  equipmentId: string;
  quantity: number;
  isReturned: string;
  dateReturned?: Timestamp;
}

export interface SchoolEvent {
  id: string;
  name: string;
  description: string;
  departmentId: string | null;
  startTime: Timestamp;
  endTime: Timestamp;
  status: string;
  requestId: string;
}
