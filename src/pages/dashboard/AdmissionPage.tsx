import { useEffect, useState } from "react";
import { Admission } from "../../lib/globals";
import { useUser } from "../../providers/UserProvider";
import { getAdmissions } from "../../lib/admission";

export default function AdmissionPage() {
  const { user } = useUser();
  const [admissions, setAdmissions] = useState<Admission[]>([]);

  useEffect(() => {
    const fetchAdmissions = async () => {
      const admissions = await getAdmissions(
        user.assignedOffice === "OSAS" ? "2" : "1"
      );
      setAdmissions(admissions);
    };
    fetchAdmissions();
  }, [user]);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admissions</h1>

      {admissions.length > 0 ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Admission #</th>
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Contact</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Date Submitted</th>
              <th className="border px-4 py-2">Files</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2 text-center">
                  {admission.admissionNumber}
                </td>
                <td className="border px-4 py-2">
                  {admission.firstName} {admission.middleName}{" "}
                  {admission.lastName}
                </td>
                <td className="border px-4 py-2">{admission.email}</td>
                <td className="border px-4 py-2">{admission.contactNumber}</td>
                <td className="border px-4 py-2 text-center">
                  {admission.status}
                </td>
                <td className="border px-4 py-2 text-center">
                  {admission.dateSubmitted.toDate().toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  <ul className="list-disc">
                    {admission.fileUrls.map((url, index) => (
                      <li key={index}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View File {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No admissions available.</p>
      )}
    </main>
  );
}
