import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <section className="w-full flex items-center justify-center">
      <LoaderCircleIcon className="animate-spin" />
    </section>
  );
}
