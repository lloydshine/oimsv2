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
  return account.accountType === "User" ? (
    <UserEquipmentRequestPage />
  ) : (
    <DepartmentEquipmentRequestPage />
  );
}

function DepartmentEquipmentRequestPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("eventId");

  const [event, setEvent] = useState<SchoolEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const { department } = useDepartment();

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const eventData = await getEventById(eventId);
          setEvent(eventData);
        } catch (error) {
          console.error("Failed to fetch event:", error);
          setEvent(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <Loading />;
  if (!event && eventId) return <>Event not found</>;

  return (
    <main>
      <h1>{eventId ? `For ${event?.name}` : "Request Equipment"}</h1>
      <EquipmentRequestForm eventId={event?.id} departmentId={department.id} />
    </main>
  );
}

function UserEquipmentRequestPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const eventId = query.get("eventId");

  const [event, setEvent] = useState<SchoolEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (eventId) {
        try {
          const eventData = await getEventById(eventId);
          setEvent(eventData);
        } catch (error) {
          console.error("Failed to fetch event:", error);
          setEvent(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) return <Loading />;
  if (!event && eventId) return <>Event not found</>;

  return (
    <main>
      <h1>{eventId ? `For ${event?.name}` : "Request Equipment"}</h1>
      <EquipmentRequestForm eventId={event?.id} />
    </main>
  );
}
