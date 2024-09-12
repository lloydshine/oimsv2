import { useEffect, useState } from "react";
import { SchoolEvent } from "../../lib/globals";
import { getActiveEvents } from "../../lib/events";

export default function EventsLandingPage() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getActiveEvents();
        setEvents(events);
      } catch (error) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <section
        className="text-white h-[70vh] flex flex-col justify-center items-center text-center bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.389), rgba(0, 0, 0, 0.873)), url("/2.jpg")`,
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Events</h1>
          <p className="text-lg">
            Stay informed with the latest events and activities happening in our
            institution.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="w-full p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>

        {/* Show loading state */}
        {loading && <p className="text-center">Loading events...</p>}

        {/* Show error message if any */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* No events message */}
        {!loading && !error && events.length === 0 && (
          <p className="text-center">No upcoming events at the moment.</p>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-4"
            >
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-700">{event.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  Department: {event.departmentId}
                </span>
                <span className="text-sm text-gray-500">
                  Status: {event.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Start:{" "}
                  {new Date(event.startTime.toDate()).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-600">
                  End: {new Date(event.endTime.toDate()).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
