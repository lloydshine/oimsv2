import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { createProgram, updateProgram, deleteProgram } from "../lib/program";
import { Department, Program } from "../lib/globals"; // Assuming you have these types
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../lib/department";
import { Loader } from "lucide-react";

// Define the schema for program validation
const schema = z.object({
  name: z.string().min(3, "Program name must be at least 3 characters long"),
  shortName: z.string().min(2, "Short name must be at least 2 characters long"),
  departmentId: z.string().nullable(),
});

export type ProgramFormData = z.infer<typeof schema>;

export function ProgramForm({
  program,
  defaultDepartmentId,
}: {
  program?: Program | null;
  defaultDepartmentId?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProgramFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: program?.name || "",
      shortName: program?.shortName || "",
      departmentId: defaultDepartmentId || program?.departmentId || null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    reset({
      name: program?.name || "",
      shortName: program?.shortName || "",
      departmentId: defaultDepartmentId || program?.departmentId || null,
    });
  }, [program, reset]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
      setFetching(false);
    };
    fetchDepartments();
  }, []);

  const onSubmit = async (data: ProgramFormData) => {
    setLoading(true);
    try {
      if (program) {
        await updateProgram(program.id, data);
        toast.success("Program successfully updated.");
      } else {
        await createProgram(data);
        toast.success("Program successfully created.");
      }
      navigate("/dashboard/programs");
    } catch (error) {
      console.error("Error handling submission:", error);
      toast.error("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (!program) return;
    setDeleting(true);
    toast
      .promise(deleteProgram(program.id), {
        loading: "Deleting...",
        success: <b>Delete successful!</b>,
        error: <b>Delete failed. Please try again.</b>,
      })
      .then(() => {
        navigate("/dashboard/programs");
      })
      .catch((error) => {
        console.error("Toast error:", error);
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  if (fetching)
    return (
      <div className="w-full flex items-center justify-center h-max">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-gray-500 text-sm">
          Program Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Program Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="shortName" className="text-gray-500 text-sm">
          Short Name
        </label>
        <input
          {...register("shortName")}
          id="shortName"
          type="text"
          placeholder="Short Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.shortName && <p>{errors.shortName.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="departmentId" className="text-gray-500 text-sm">
          Department
        </label>
        <select
          {...register("departmentId")}
          id="departmentId"
          className="p-2 border border-gray-300 rounded-lg"
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

      <div className="flex items-center justify-end gap-4">
        {program && (
          <button
            className="border-red-600 text-red-600 border-2 px-6 py-2 rounded-lg"
            onClick={handleDelete}
            disabled={loading}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading
            ? program
              ? "Updating..."
              : "Creating..."
            : program
            ? "Update"
            : "Create"}
        </button>
      </div>
    </form>
  );
}
