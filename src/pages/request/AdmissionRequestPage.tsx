import { useLocation } from "react-router-dom";
import AdmissionForm from "../../forms/AdmissionForm";

export default function AdmissionRequestPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const admissionNumber = query.get("no");
  if (!admissionNumber) return;
  if (admissionNumber !== "1" && admissionNumber !== "2") return;

  return (
    <main className="w-full">
      <AdmissionForm admissionNumber={admissionNumber} />
    </main>
  );
}
