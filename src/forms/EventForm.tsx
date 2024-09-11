import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { createEvent, updateEvent, deleteEvent } from "../lib/events";
import { Department, SchoolEvent } from "../lib/globals";
import { useNavigate } from "react-router-dom";
import { getDepartments } from "../lib/department";
import { Loader } from "lucide-react";

// Define the schema for event validation
const schema = z
  .object({
    name: z.string().min(3, "Event name must be at least 3 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long"),
    departmentId: z.string().nullable(),
    startTime: z.date().refine((date) => date > new Date(), {
      message: "Start time must be in the future",
    }),
    endTime: z.date(),
  })
  .superRefine((data, ctx) => {
    if (data.endTime <= data.startTime) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be after the start time",
        path: ["endTime"], // Focus the error on the endTime field
      });
    }
  });

export type EventFormData = z.infer<typeof schema>;

export function EventForm({
  event,
  defaultDepartmentId,
}: {
  event?: SchoolEvent | null;
  defaultDepartmentId?: string; // Optional prop for default department ID
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset, // Added reset
  } = useForm<EventFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: event?.name || "",
      description: event?.description || "",
      departmentId: defaultDepartmentId || event?.departmentId || null,
      startTime: event?.startTime ? event.startTime.toDate() : undefined,
      endTime: event?.endTime ? event.endTime.toDate() : undefined,
    },
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (defaultDepartmentId) {
      setValue("departmentId", defaultDepartmentId);
    }
  }, [defaultDepartmentId, setValue]);

  useEffect(() => {
    reset({
      name: event?.name || "",
      description: event?.description || "",
      departmentId: defaultDepartmentId || event?.departmentId || null,
      startTime: event?.startTime ? event.startTime.toDate() : undefined,
      endTime: event?.endTime ? event.endTime.toDate() : undefined,
    });
  }, [event, defaultDepartmentId, reset]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
      setFetching(false);
    };
    fetchDepartments();
  }, []);

  const onSubmit = async (data: EventFormData) => {
    setLoading(true);

    try {
      if (event) {
        await updateEvent(event.id, data);
        toast.success("Event successfully updated.");
      } else {
        await createEvent(data);
        toast.success("Event successfully created.");
      }
      navigate("/dashboard/events");
    } catch (error) {
      console.error("Error handling submission:", error);
      toast.error("Error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (!event) return;
    setDeleting(true);
    toast
      .promise(deleteEvent(event.id), {
        loading: "Deleting...",
        success: <b>Delete successful!</b>,
        error: <b>Delete failed. Please try again.</b>,
      })
      .then(() => {
        navigate("/dashboard/events");
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
          Event Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Event Name"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="description" className="text-gray-500 text-sm">
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          placeholder="Description"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      {/* Change departmentId to a select field */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="departmentId" className="text-gray-500 text-sm">
          Department (Optional)
        </label>
        <select
          {...register("departmentId")}
          id="departmentId"
          className="p-2 border border-gray-300 rounded-lg"
          disabled={!!defaultDepartmentId} // Disable if defaultDepartmentId is provided
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

      <div className="flex flex-col space-y-2">
        <label htmlFor="startTime" className="text-gray-500 text-sm">
          Start Time
        </label>
        <input
          {...register("startTime", { valueAsDate: true })}
          id="startTime"
          type="datetime-local"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.startTime && <p>{errors.startTime.message}</p>}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="endTime" className="text-gray-500 text-sm">
          End Time
        </label>
        <input
          {...register("endTime", { valueAsDate: true })}
          id="endTime"
          type="datetime-local"
          className="p-2 border border-gray-300 rounded-lg"
        />
        {errors.endTime && <p>{errors.endTime.message}</p>}
      </div>

      <div className="flex items-center justify-end gap-4">
        {event && (
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
            ? event
              ? "Updating..."
              : "Creating..."
            : event
            ? "Update"
            : "Create"}
        </button>
      </div>
    </form>
  );
}
