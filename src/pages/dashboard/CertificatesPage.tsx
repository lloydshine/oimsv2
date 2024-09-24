import { PDFViewer } from "@react-pdf/renderer";
import Certificate from "../../components/dashboard/certificates/Certificate";
import Loading from "../../components/Loading";
import { useCertificates } from "../../lib/certificate";

export default function CertificatesPage() {
  const { requests, loading } = useCertificates();

  if (loading) return <Loading />;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                Student ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                Certificate Type
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                Purpose
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left text-gray-700 font-semibold">
                Date Requested
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="bg-white even:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">
                  {req.studentId}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {req.certificateType}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {req.purpose}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {req.dateRequested.toDate().toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PDFViewer className="h-screen w-full">
        <Certificate
          request={requests[0]}
          student={{
            id: "1",
            studentId: "202400123",
            firstName: "John",
            middleName: "A.",
            lastName: "Doe",
            email: "john.doe@student.edu",
            contactNumber: "09123456789",
            departmentId: "dept-001",
            programId: "prog-001",
            yearLevel: "3",
          }}
        />
      </PDFViewer>
    </div>
  );
}
