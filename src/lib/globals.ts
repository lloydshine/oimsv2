import {
  Calendar,
  HandIcon,
  HardHatIcon,
  HouseIcon,
  PaperclipIcon,
  PieChartIcon,
  School2Icon,
  TentIcon,
  UserIcon,
} from "lucide-react";

interface Program {
  name: string;
  shortName: string;
}

interface Department {
  name: string;
  shortName: string;
  programs: Program[];
}

export const departments: Department[] = [
  {
    name: "College of Computer Studies",
    shortName: "CCS",
    programs: [
      {
        name: "Bachelor of Science in Information Technology",
        shortName: "BSIT",
      },
      { name: "Bachelor of Science in Computer Science", shortName: "BSCS" },
    ],
  },
  {
    name: "College of Criminology",
    shortName: "COC",
    programs: [
      { name: "Bachelor of Science in Criminology", shortName: "BSCrim" },
    ],
  },
  {
    name: "College of Arts and Sciences",
    shortName: "CAS",
    programs: [
      { name: "Bachelor of Arts in Communication", shortName: "ABComm" },
      { name: "Bachelor of Science in Psychology", shortName: "BSPsych" },
    ],
  },
  {
    name: "College of Business Administration",
    shortName: "CBA",
    programs: [
      {
        name: "Bachelor of Science in Business Administration",
        shortName: "BSBA",
      },
      { name: "Bachelor of Science in Accountancy", shortName: "BSA" },
    ],
  },
  {
    name: "College of Education",
    shortName: "COED",
    programs: [
      { name: "Bachelor of Elementary Education", shortName: "BEEd" },
      { name: "Bachelor of Secondary Education", shortName: "BSEd" },
    ],
  },
  {
    name: "College of Engineering",
    shortName: "COE",
    programs: [
      { name: "Bachelor of Science in Civil Engineering", shortName: "BSCE" },
      {
        name: "Bachelor of Science in Electrical Engineering",
        shortName: "BSEE",
      },
    ],
  },
];

export const links = [
  { tag: "Dashboard", icon: PieChartIcon, to: "/dashboard" },
  { tag: "Profile", icon: UserIcon, to: "/dashboard/profile" },
  { tag: "Requests", icon: HandIcon, to: "/dashboard/requests" },
  { tag: "Sport Equipments", icon: TentIcon, to: "/dashboard/sportsequipment" },
  { tag: "Admission", icon: School2Icon, to: "/dashboard/admission" },
  { tag: "Certificates", icon: PaperclipIcon, to: "/dashboard/certificates" },
  { tag: "Career", icon: HardHatIcon, to: "/dashboard/career" },
  { tag: "Events", icon: Calendar, to: "/dashboard/events" },
  { tag: "Department", icon: HouseIcon, to: "/dashboard/department" },
];
