export function StatusBadge({ status }: { status: string }) {
  let bgColor;
  let textColor;

  switch (status) {
    case "Approved":
      bgColor = "bg-green-100";
      textColor = "text-green-800";
      break;
    case "Pending":
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
      break;
    case "Declined":
      bgColor = "bg-red-100";
      textColor = "text-red-800";
      break;
    default:
      bgColor = "bg-blue-600";
      textColor = "text-primary-foreground";
      break;
  }

  return (
    <div className={`inline-block px-3 py-1 rounded-md ${bgColor}`}>
      <span className={`text-sm font-medium ${textColor}`}>{status}</span>
    </div>
  );
}
