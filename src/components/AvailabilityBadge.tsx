export function AvailabilityBadge({ isAvailable }: { isAvailable: boolean }) {
  return (
    <div
      className={`px-2 text-white rounded-full w-fit ${
        isAvailable ? "bg-green-600" : "bg-orange-600"
      }`}
    >
      <span className="text-sm">
        {isAvailable ? "Available" : "Not Available"}
      </span>
    </div>
  );
}
