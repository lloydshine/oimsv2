import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { login, UserType } from "../lib/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const schema = z.object({
  email: z.string().min(10, {
    message: "Email must be at least 10 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 8 characters.",
  }),
  retypePassword: z.string().min(4, {
    message: "Password must be at least 8 characters.",
  }),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  contactNumber: z.string().min(11),
  userType: z.enum([UserType.Internal, UserType.External]),
});

export type UserFormData = z.infer<typeof schema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, []);

  const onSubmit = async (data: UserFormData) => {
    setLoading(true);
    toast
      .promise(login(data.email, data.password), {
        loading: "Logging in...",
        success: <b>Login successful!</b>,
        error: <b>Login failed. Please try again.</b>,
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Toast error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="text-gray-700 font-medium">
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
        <label htmlFor="password" className="text-gray-700 font-medium">
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
      <div className="flex items-center justify-end">
        <button
          className="px-6 py-3 bg-red-950 text-white rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
}
