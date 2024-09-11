import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits long"),
});

export type StudentFormData = z.infer<typeof studentSchema>;

export default function AdmissionForm({
  admissionNumber,
}: {
  admissionNumber: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      contactNumber: "",
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    // Handle form submission
    toast.success("Form submitted successfully!");
    console.log(data);
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-red-950">
        {admissionNumber === "1"
          ? "New Student Admission"
          : "Old/Returnee Student Admission"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          {errors.firstName && (
            <p className="text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="middleName" className="text-gray-500 text-sm">
            Middle Name
          </label>
          <input
            {...register("middleName")}
            id="middleName"
            type="text"
            placeholder="Middle Name (Optional)"
            className="p-2 border border-gray-300 rounded-lg"
          />
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
          {errors.lastName && (
            <p className="text-red-600">{errors.lastName.message}</p>
          )}
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
            className="p-2 border border-gray-300 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="contactNumber" className="text-gray-500 text-sm">
            Contact Number
          </label>
          <input
            {...register("contactNumber")}
            id="contactNumber"
            type="text"
            placeholder="Contact Number"
            className="p-2 border border-gray-300 rounded-lg"
          />
          {errors.contactNumber && (
            <p className="text-red-600">{errors.contactNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-red-950 text-white rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
