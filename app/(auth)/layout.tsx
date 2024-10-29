import { Toaster } from "@/components/ui/toaster";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (user) {
    redirect("/admin/dashboard");
  }
  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
}
