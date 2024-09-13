import { LoginForm } from "../../forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="h-screen flex">
      <div className="md:w-[40rem] w-full md:p-20 p-10 flex flex-col items-center gap-10 justify-center">
        <img src="/logo.png" alt="logo" className="h-[10rem]" />
        <LoginForm />
      </div>
      <div
        className="flex-1 bg-red-950 hidden md:flex bg-bottom bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.389), rgba(0, 0, 0, 0.573)), url("/4.jpg")`,
        }}
      ></div>
    </main>
  );
}
