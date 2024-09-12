import { BellIcon } from "lucide-react";
import { useState } from "react";

export function Notifications() {
  const [open, setOpen] = useState(false);
  const notificationCount = 3; // Example count of notifications

  // Example notifications data
  const notifications = [
    {
      id: 1,
      message: "Notification 1: This is a sample notification message.",
      time: "Just now",
      unread: true,
    },
    {
      id: 2,
      message: "Notification 2: This is another sample notification message.",
      time: "5 minutes ago",
      unread: false,
    },
    {
      id: 3,
      message: "Notification 3: Here is yet another sample notification.",
      time: "10 minutes ago",
      unread: true,
    },
  ];

  return (
    <div className="relative w-10 h-10">
      <div
        className="flex items-center justify-center w-full h-full rounded-full bg-slate-200 text-red-950 border-2 cursor-pointer relative"
        onClick={() => setOpen(!open)}
      >
        <BellIcon />
        {notificationCount > 0 && (
          <span className="absolute top-[-0.5rem] right-[-0.5rem] w-5 h-5 bg-red-600 text-white text-xs font-bold flex items-center justify-center rounded-full">
            {notificationCount}
          </span>
        )}
      </div>
      {open && (
        <div className="absolute z-40 top-[4rem] right-[-80px] md:right-0 w-[20rem] border-2 bg-slate-100 rounded-lg shadow-lg p-4">
          <div className="flex flex-col space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center p-2 bg-slate-100 border-b-2 rounded-lg"
              >
                {notification.unread && (
                  <span className="w-2.5 h-2.5 bg-red-950 rounded-full mr-2"></span>
                )}
                <div className="flex-1">
                  <p className="text-sm">{notification.message}</p>
                  <span className="text-xs text-gray-400">
                    {notification.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
