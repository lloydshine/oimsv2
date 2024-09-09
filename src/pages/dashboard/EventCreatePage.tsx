import { EventForm } from "../../forms/EventForm";
import { useAccount } from "../../providers/AccountProvider";
import { useDepartment } from "../../providers/DepartmentProvider";

export default function EventCreatePage() {
  const { account } = useAccount();
  if (account.accountType === "Department") {
    const { department } = useDepartment();
    return <EventForm defaultDepartmentId={department.id} />;
  } else {
    return <EventForm />;
  }
}
