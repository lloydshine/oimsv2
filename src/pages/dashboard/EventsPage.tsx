import { EventCard } from "../../components/dashboard/events/EventCard";
import { SchoolEvent } from "../../lib/globals";
import { useAccount } from "../../providers/AccountProvider";
import { useDepartment } from "../../providers/DepartmentProvider";
import { useUser } from "../../providers/UserProvider";

export const events: SchoolEvent[] = [
  {
    id: "1",
    name: "Math Workshop",
    description: "A hands-on workshop focusing on advanced algebra topics.",
    departmentId: "fWrG8QIdb7PzahIVfte15g4qhTu1",
    startTime: new Date(2024, 8, 10, 9, 0), // September 10, 2024, 9:00 AM
    endTime: new Date(2024, 8, 10, 11, 0), // September 10, 2024, 11:00 AM
  },
  {
    id: "2",
    name: "Science Fair",
    description: "Students showcase their scientific projects and experiments.",
    departmentId: "fWrG8QIdb7PzahIVfte15g4qhTu1",
    startTime: new Date(2024, 8, 11, 13, 0), // September 11, 2024, 1:00 PM
    endTime: new Date(2024, 8, 11, 16, 0), // September 11, 2024, 4:00 PM
  },
  {
    id: "3",
    name: "History Lecture",
    description: "A guest lecture on the Industrial Revolution.",
    departmentId: "fWrG8QIdb7PzahIVfte15g4qhTu1",
    startTime: new Date(2024, 8, 12, 14, 0), // September 12, 2024, 2:00 PM
    endTime: new Date(2024, 8, 12, 15, 30), // September 12, 2024, 3:30 PM
  },
  {
    id: "4",
    name: "Art Exhibition",
    description: "An exhibition showcasing student art projects.",
    departmentId: "fWrG8QIdb7PzahIVfte15g4qhTu1",
    startTime: new Date(2024, 8, 13, 10, 30), // September 13, 2024, 10:30 AM
    endTime: new Date(2024, 8, 13, 12, 30), // September 13, 2024, 12:30 PM
  },
  {
    id: "5",
    name: "Literature Club Meeting",
    description: "A meeting to discuss classic literature and upcoming events.",
    departmentId: null, // This event is not associated with a specific department
    startTime: new Date(2024, 8, 14, 11, 0), // September 14, 2024, 11:00 AM
    endTime: new Date(2024, 8, 14, 12, 30), // September 14, 2024, 12:30 PM
  },
  {
    id: "6",
    name: "Physical Education Tournament",
    description:
      "A school-wide sports tournament involving various athletic activities.",
    departmentId: null,
    startTime: new Date(2024, 8, 15, 8, 0), // September 15, 2024, 8:00 AM
    endTime: new Date(2024, 8, 15, 14, 0), // September 15, 2024, 2:00 PM
  },
];

export default function EventsPage() {
  const { account } = useAccount();
  if (account.accountType == "Department") return <DepartmentEvents />;
  return <UserEvents />;
}

function DepartmentEvents() {
  const { department } = useDepartment();
  {
    department.name;
  }
  return (
    <main className="w-full flex flex-wrap">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </main>
  );
}

function UserEvents() {
  const { user } = useUser();
  return (
    <main className="w-full flex flex-wrap">
      {user.firstName}
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </main>
  );
}
