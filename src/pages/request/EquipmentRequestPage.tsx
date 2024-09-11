import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SchoolEvent } from "../../lib/globals";
import { getEventById } from "../../lib/events";
import { EquipmentRequestForm } from "../../forms/EquipmentRequestForm";
import Loading from "../../components/Loading";
import { useDepartment } from "../../providers/DepartmentProvider";
import { useAccount } from "../../providers/AccountProvider";

export default function EquipmentRequestPage() {
  const { account } = useAccount();

  if (account.accountType == "User") return <UserEquipmentRequestPage />;
  return <DepartmentEquipmentRequestPage />;
}

function DepartmentEquipmentRequestPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("eventId");

  const [event, setEvent] = useState<SchoolEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const { department } = useDepartment();

  if (!eventId) return <EquipmentRequestForm departmentId={department.id} />;

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEventById(eventId);
      setEvent(event);
      setLoading(false);
    };
    fetchEvent();
  }, []);

  if (loading) return <Loading />;
  if (!event) return <>Event not found</>;

  return (
    <main>
      <h1>For {event.name}</h1>
      <EquipmentRequestForm eventId={event.id} departmentId={department.id} />
    </main>
  );
}

function UserEquipmentRequestPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("eventId");

  const [event, setEvent] = useState<SchoolEvent | null>(null);
  const [loading, setLoading] = useState(true);

  if (!eventId) return <EquipmentRequestForm />;

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEventById(eventId);
      setEvent(event);
      setLoading(false);
    };
    fetchEvent();
  }, []);

  if (loading) return <Loading />;
  if (!event) return <>Event not found</>;

  return (
    <main>
      <h1>For {event.name}</h1>
      <EquipmentRequestForm eventId={event.id} />
    </main>
  );
}
