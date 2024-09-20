import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useState } from "react";
import { getStudentByStudentId } from "../lib/student";
import { StudentInfo } from "../components/request/StudentInfo";
import { Student } from "../lib/globals";

// Schema for certificate form
const schema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  certificateType: z.string().min(1, "Certificate type is required"),
  purpose: z.string().min(1, "Purpose is required"),
});

export type CertificateFormData = z.infer<typeof schema>;

export default function CertificateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      studentId: "",
      certificateType: "",
      purpose: "",
    },
  });

  const [studentInfo, setStudentInfo] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CertificateFormData) => {
    setLoading(true);
    try {
      // Submit form data (handle certificate request submission)
      console.log("Form submitted", data);
      toast.success("Certificate request submitted!");
    } catch (error) {
      toast.error("Failed to submit certificate request");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentIdChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const studentId = e.target.value;
    setValue("studentId", studentId);
    if (studentId.length == 9) {
      // Fetch and display student info based on ID
      try {
        const info = await getStudentByStudentId(studentId);
        setStudentInfo(info);
      } catch (error) {
        toast.error("Failed to fetch student information");
      }
    } else {
      setStudentInfo(null); // Clear if no ID is entered
    }
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-red-950">
        Certificate Request Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <section className="flex flex-col md:flex-row gap-4">
          <div className="space-y-4 md:w-[40rem] w-full">
            {/* Student ID Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="studentId" className="text-gray-500 text-sm">
                Student ID
              </label>
              <input
                {...register("studentId")}
                id="studentId"
                type="text"
                placeholder="Enter Student ID"
                onChange={handleStudentIdChange}
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.studentId && (
                <p className="text-red-600">{errors.studentId.message}</p>
              )}
            </div>

            {/* Certificate Type Input */}
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="certificateType"
                className="text-gray-500 text-sm"
              >
                Certificate Type
              </label>
              <input
                {...register("certificateType")}
                id="certificateType"
                type="text"
                placeholder="Enter Certificate Type"
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.certificateType && (
                <p className="text-red-600">{errors.certificateType.message}</p>
              )}
            </div>

            {/* Purpose Input */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="purpose" className="text-gray-500 text-sm">
                Purpose
              </label>
              <textarea
                {...register("purpose")}
                id="purpose"
                placeholder="Enter Purpose"
                className="p-2 border border-gray-300 rounded-lg"
              />
              {errors.purpose && (
                <p className="text-red-600">{errors.purpose.message}</p>
              )}
            </div>
          </div>

          {/* Display Student Info */}
          <StudentInfo student={studentInfo} />
        </section>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
