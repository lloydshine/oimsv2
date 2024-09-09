// @ts-nocheck

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SchoolEvent } from "../../lib/globals";
import { getEventById } from "../../lib/events";

export default function EventPage() {
  const [event, setEvent] = useState<SchoolEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const event = await getEventById(id);
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

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 mr-2"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Event Details */}
      {event ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2">{event.name}</h1>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="mb-2">
            <p className="font-semibold">Start Time:</p>
            <p>{new Date(event.startTime.seconds * 1000).toLocaleString()}</p>
          </div>
          <div className="mb-2">
            <p className="font-semibold">End Time:</p>
            <p>{new Date(event.endTime.seconds * 1000).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Department ID:</p>
            <p>{event.departmentId}</p>
          </div>
          {/* Add more event details as needed */}
        </div>
      ) : (
        <p className="text-center text-gray-600">Event not found.</p>
      )}
    </div>
  );
}
