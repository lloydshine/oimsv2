import {
  BookIcon,
  CalendarCheck,
  BaggageClaimIcon,
  HardHatIcon,
  User2Icon,
  GroupIcon,
  PieChartIcon,
  CogIcon,
  UserCircle,
} from "lucide-react";

export const appLinks = [
  { tag: "Dashboard", href: "/admin/dashboard", icon: <PieChartIcon /> },
  { tag: "Admission", href: "/admin/admission", icon: <BookIcon /> },
  { tag: "Events", href: "/admin/events", icon: <CalendarCheck /> },
  { tag: "Equipments", href: "/admin/equipments", icon: <BaggageClaimIcon /> },
  { tag: "Career", href: "/admin/career", icon: <HardHatIcon /> },
  { tag: "Certificates", href: "/admin/certificates", icon: <BookIcon /> },
];

export const adminLinks = [
  { tag: "Users", href: "/admin/users", icon: <User2Icon /> },
  { tag: "Departments", href: "/admin/departments", icon: <GroupIcon /> },
];

export const userLinks = [
  { tag: "Profile", href: "/admin/profile", icon: <UserCircle /> },
  { tag: "Settings", href: "/admin/settings", icon: <CogIcon /> },
];

export const marketingLinks = [
  { tag: "Admission", href: "/admission" },
  { tag: "Events", href: "/events" },
  { tag: "Equipments", href: "/equipments" },
  { tag: "Career", href: "/career" },
];
