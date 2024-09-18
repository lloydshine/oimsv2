import { z } from "zod";
import { Department, Program, Student } from "../lib/globals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../lib/department";
import { createStudent } from "../lib/student";
//import { getProgramsByDepartmentId } from "../lib/programs"; // Assuming you have this function

const schema = z.object({
  studentId: z.string().min(3),
  firstName: z.string().min(3),
  middleName: z.string().min(3),
  lastName: z.string().min(3),
  departmentId: z.string().optional(),
  programId: z.string().optional(),
  yearLevel: z.string(),
  email: z.string().optional(),
  contactNumber: z.string().optional(),
});

export type StudentFormData = z.infer<typeof schema>;

export default function StudentForm({
  student,
  defaultDepartmentId,
}: {
  student?: Student;
  defaultDepartmentId?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<StudentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: student?.firstName || "",
      middleName: student?.middleName || "",
      lastName: student?.lastName || "",
      departmentId: student?.departmentId || defaultDepartmentId || "",
      programId: student?.programId || "",
      yearLevel: student?.yearLevel || "",
      email: student?.email || "",
      contactNumber: student?.contactNumber || "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
      setFetching(false);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (student?.departmentId) {
      fetchPrograms(student.departmentId);
    }
  }, [student?.departmentId]);

  const fetchPrograms = async (departmentId: string) => {
    if (!departmentId) return;
    //const programs = await getProgramsByDepartmentId(departmentId);
    setPrograms([]);
  };

  const handleDepartmentChange = (e: any) => {
    const departmentId = e.target.value;
    setValue("programId", ""); // Reset the program select when department changes
    fetchPrograms(departmentId);
  };

  const onSubmit = async (data: StudentFormData) => {
    setLoading(true);

    try {
      // Perform create/update actions here
      await createStudent(data);
      navigate("/dashboard/students"); // Redirect after submission
    } catch (error) {
      console.error("Error handling submission:", error);
      // Handle error (e.g., show toast notification)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <div className="flex flex-col space-y-2">
        <label htmlFor="studentId" className="text-gray-500 text-sm">
          Student ID
        </label>
        <input
          {...register("studentId")}
          id="studentId"
          type="text"
          placeholder="Student ID"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.studentId && <p>{errors.studentId.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="firstName" className="text-gray-500 text-sm">
          First Name
        </label>
        <input
          {...register("firstName")}
          id="firstName"
          type="text"
          placeholder="First Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="middleName" className="text-gray-500 text-sm">
          Middle Name
        </label>
        <input
          {...register("middleName")}
          id="middleName"
          type="text"
          placeholder="Middle Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.middleName && <p>{errors.middleName.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="lastName" className="text-gray-500 text-sm">
          Last Name
        </label>
        <input
          {...register("lastName")}
          id="lastName"
          type="text"
          placeholder="Last Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>

      {/* Department Select */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="departmentId" className="text-gray-500 text-sm">
          Department
        </label>
        <select
          {...register("departmentId")}
          id="departmentId"
          className="p-2 border border-gray-300 rounded-lg"
          onChange={handleDepartmentChange}
          disabled={loading || fetching}
        >
          <option value="">Select a department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
        {errors.departmentId && <p>{errors.departmentId.message}</p>}
      </div>

      {/* Program Select */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="programId" className="text-gray-500 text-sm">
          Program
        </label>
        <select
          {...register("programId")}
          id="programId"
          className="p-2 border border-gray-300 rounded-lg"
          disabled={programs.length === 0}
        >
          <option value="">Select a program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {program.name}
            </option>
          ))}
        </select>
        {errors.programId && <p>{errors.programId.message}</p>}
      </div>

      {/* Year Level */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="yearLevel" className="text-gray-500 text-sm">
          Year Level
        </label>
        <input
          {...register("yearLevel")}
          id="yearLevel"
          type="text"
          placeholder="Year Level"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.yearLevel && <p>{errors.yearLevel.message}</p>}
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : student ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
