// @ts-nocheck

import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getEventEquipmentRequest } from "../../lib/equipment";
import { getEventById } from "../../lib/events";
import { SchoolEvent, EquipmentRequest } from "../../lib/globals";
import { StatusBadge } from "../../components/StatusBadge";
import { RequestedEquipmentCard } from "../../components/dashboard/equipments/RequestedEquipmentCard";
import { updateStatus } from "../../lib/firebase";
import { useAccount } from "../../providers/AccountProvider";

export default function EventPage() {
  const [event, setEvent] = useState<SchoolEvent | null>(null);
  const [request, setRequest] = useState<EquipmentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  const { account } = useAccount();
  const fetchEvent = async () => {
    if (id) {
      try {
        const event = await getEventById(id);
        if (event?.requestId) {
          const request = await getEventEquipmentRequest(event.requestId);
          setRequest(request);
        }
        setEvent(event);
      } catch (err) {
        setError("Failed to load event.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("No event ID provided.");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!event)
    return <p className="text-center text-red-600">Event not found.</p>;

  return (
    <main className="w-full space-y-10">
      <section>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <StatusBadge status={event.status} />
        </div>
        <p>{event.description}</p>
        <p className="text-sm text-gray-500">
          Start: {new Date(event.startTime.seconds * 1000).toLocaleString()}{" "}
          <br />
          End: {new Date(event.endTime.seconds * 1000).toLocaleString()}
        </p>
      </section>
      <section>
        {request ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <h1 className="font-semibold">Requested Equipments</h1>
              <StatusBadge status={request.status} />
            </div>
            <div className="w-full flex flex-wrap gap-4">
              {request.requestedEquipments.map((eq) => (
                <RequestedEquipmentCard
                  requestedEquipment={eq}
                  key={eq.equipmentId}
                />
              ))}
            </div>
          </div>
        ) : (
          <button className="px-4 py-2 bg-red-950 text-white rounded-lg">
            <Link to={`/dashboard/equipments/request?eventId=${event.id}`}>
              Request Sport Equipments
            </Link>
          </button>
        )}
      </section>
      {account.accountType == "User" && (
        <UserPanel event={event} request={request} revalidate={fetchEvent} />
      )}
    </main>
  );
}

function UserPanel({
  event,
  request,
  revalidate,
}: {
  event: SchoolEvent;
  request: EquipmentRequest;
  revalidate: () => void;
}) {
  return (
    <main className="space-x-5">
      <button
        className="px-4 py-2 bg-red-950 text-white rounded-lg"
        onClick={() => {
          updateStatus(event.id, "events", "Approved");
          revalidate();
        }}
      >
        Approve Event
      </button>
      <button
        className="px-4 py-2 bg-red-950 text-white rounded-lg"
        onClick={() => {
          updateStatus(event.id, "events", "Declined");
          revalidate();
        }}
      >
        Decline Event
      </button>
      <button
        className="px-4 py-2 bg-red-950 text-white rounded-lg"
        onClick={() => {
          updateStatus(request.id, "equipmentRequests", "Approved");
          revalidate();
        }}
      >
        Approve Equipment Request
      </button>
      <button
        className="px-4 py-2 bg-red-950 text-white rounded-lg"
        onClick={() => {
          updateStatus(request.id, "equipmentRequests", "Declined");
          revalidate();
        }}
      >
        Decline Equipment Request
      </button>
      <button
        className="px-4 py-2 bg-red-950 text-white rounded-lg"
        onClick={() => {
          updateStatus(event.id, "events", "Completed");
          revalidate();
        }}
      >
        Mark Event Completed
      </button>
    </main>
  );
}
