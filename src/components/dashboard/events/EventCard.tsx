import { useEffect, useState } from "react";
import { Department, SchoolEvent } from "../../../lib/globals";
import { getAccountData } from "../../../lib/account";

export function EventCard({ event }: { event: SchoolEvent }) {
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    // Async function to fetch department data
    const fetchDepartment = async () => {
      if (!event.departmentId) return;
      try {
        const departmentData = await getAccountData(
          event.departmentId,
          "Department"
        );
        setDepartment(departmentData as Department); // Type casting if you're sure it's a Department
      } catch (error) {
        console.error("Failed to fetch department data", error);
        setDepartment(null); // Optional: Handle any errors and set department to null
      }
    };
    fetchDepartment(); // Call the async function
  }, [event.departmentId]); // Add departmentId as a dependency

  return (
    <div className="w-[40rem] flex flex-col border-2 rounded-xl overflow-hidden m-4">
      <div
        className="p-5 flex items-center justify-between text-white"
        style={{ backgroundColor: department ? department.color : "#450A0A" }}
      >
        <h1 className="font-bold text-lg">
          {department ? department.name : "SPC"}
        </h1>
        <p>{event.name}</p>
      </div>
      <div className="p-4 bg-white text-black">
        <p className="font-semibold">{event.name}</p>
        <p>{event.description}</p>
        <p className="text-sm text-gray-500">
          Start: {event.startTime.toLocaleString()} <br />
          End: {event.endTime.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
