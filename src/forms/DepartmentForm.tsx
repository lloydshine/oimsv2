import { z } from "zod";
import { Department } from "../lib/globals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  shortName: z.string().min(3, "Shortname must be at least 3 characters long"),
  color: z.string(), // Accept string input
  email: z.string(), // Accept string input
  password: z.string().optional(),
});

export type DepartmentFormData = z.infer<typeof schema>;

export function DepartmentForm({
  revalidate,
  department,
  toggleModdal,
}: {
  revalidate: () => void;
  department?: Department | null;
  toggleModdal: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: department?.name || "",
      shortName: department?.shortName || "",
      color: department?.color || "",
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: DepartmentFormData) => {
    setLoading(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-gray-500 text-sm">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          placeholder="Item Name"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="shortName" className="text-gray-500 text-sm">
          Shortname
        </label>
        <input
          {...register("shortName")}
          id="shortName"
          type="text"
          placeholder="Shortname"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.shortName && <p>{errors.shortName.message}</p>}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="color" className="text-gray-500 text-sm">
          Color
        </label>
        <input
          {...register("color")}
          id="color"
          type="text"
          placeholder="Color"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.color && <p>{errors.color.message}</p>}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-gray-500 text-sm">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password" className="text-gray-500 text-sm">
          Password
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="flex items-center justify-end gap-4">
        <button
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading
            ? department
              ? "Updating..."
              : "Adding..."
            : department
            ? "Update"
            : "Add"}
        </button>
      </div>
    </form>
  );
}
