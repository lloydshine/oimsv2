import { Link, useLocation, useParams } from "react-router-dom";
import { EventCard } from "../../components/dashboard/events/EventCard";
import { SchoolEvent } from "../../lib/globals";
import { useAccount } from "../../providers/AccountProvider";
import { useDepartment } from "../../providers/DepartmentProvider";
//import { useUser } from "../../providers/UserProvider";
import { useEffect, useState } from "react";
import { getDepartmentEvents, getEvents } from "../../lib/events";
import EventPage from "./EventPage";
import { auth } from "../../lib/firebase";

export default function EventsPage() {
  const { account } = useAccount();
  const location = useLocation();
  const params = useParams();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const urlId = params.id;
  if (id || urlId) {
    return <EventPage />;
  }
  if (account.accountType === "Department") {
    return <DepartmentEvents />;
  }
  return <UserEvents />;
}

function DepartmentEvents() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const { department } = useDepartment();

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getDepartmentEvents(department.id);
      setEvents(events);
    };
    fetchEvents();
  }, []);

  return (
    <main className="w-full space-y-7">
      <button className="px-4 py-1 bg-red-950 text-white rounded-lg">
        <Link to="/dashboard/events/create">Create</Link>
      </button>
      <section className="w-full flex flex-wrap gap-4">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </section>
    </main>
  );
}

function UserEvents() {
  //const { user } = useUser();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const user = auth.currentUser;
  console.log(user);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setEvents(events);

      console.log(await user?.getIdToken());
    };
    fetchEvents();
  }, []);
  return (
    <main className="w-full space-y-7">
      <button className="px-4 py-1 bg-red-950 text-white rounded-lg">
        <Link to="/dashboard/events/create">Create</Link>
      </button>
      <section className="w-full flex flex-wrap gap-4">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </section>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=2e2cb7d4edcd3965c29b36abe0b2156cdd0740b91e4ceef8e341b8f5b83e45ea%40group.calendar.google.com&ctz=UTC"
        className="w-full h-[60vh]"
      ></iframe>
    </main>
  );
}
