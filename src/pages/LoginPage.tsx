import { LoginForm } from "../forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="h-screen flex">
      <div className="md:w-[40rem] w-full md:p-20 p-10 flex items-center">
        <LoginForm />
      </div>
      <div className="flex-1 bg-red-950 hidden md:flex"></div>
    </main>
  );
}
