import { LoginForm } from "../LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex">
      <section className="w-full md:w-[500px] flex items-center justify-center">
        <LoginForm />
      </section>
      <section className="hidden md:flex flex-1 bg-red-950"></section>
    </main>
  );
}
