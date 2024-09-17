import { SchoolEvent } from "./globals";
import { signInWithGoogle } from "./user";

const calendarId =
  "2e2cb7d4edcd3965c29b36abe0b2156cdd0740b91e4ceef8e341b8f5b83e45ea@group.calendar.google.com";

export async function createCalendarEvent(event: SchoolEvent) {
  const token = await signInWithGoogle(); // Get the OAuth token from the sign-in process

  if (!token) {
    console.error("No Google OAuth token found!");
    return;
  }

  console.log("Creating calendar event");
  const newEvent = {
    summary: event.name,
    description: event.description,
    start: {
      dateTime: event.startTime.toDate().toISOString(), // Convert Timestamp to Date, then to ISO string
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // e.g., America/Los_Angeles
    },
    end: {
      dateTime: event.endTime.toDate().toISOString(), // Convert Timestamp to Date, then to ISO string
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // e.g., America/Los_Angeles
    },
  };
  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token, // Access token for google
      },
      body: JSON.stringify(newEvent),
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
      alert("Event created, check your Google Calendar!");
    })
    .catch(() => {
      alert("Error");
    });
}
