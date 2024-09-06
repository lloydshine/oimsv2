import { Loader2Icon } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <Loader2Icon className="animate-spin" />
    </main>
  );
}
