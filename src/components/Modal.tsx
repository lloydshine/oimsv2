import { X } from "lucide-react";

export function Modal({
  children,
  open,
  toggleModal,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  toggleModal: () => void;
  title: string;
}) {
  if (!open) return null;

  return (
    <div className="z-50 fixed top-0 left-0 bg-black/70 h-screen w-full flex items-center justify-center p-10">
      <div className="relative w-full md:w-[50rem] h-full max-h-full md:h-[40rem] px-5 py-10  rounded-lg bg-white">
        <X onClick={toggleModal} className="absolute top-0 right-0 m-4" />
        <section className="max-h-full h-full overflow-y-auto p-5">
          <h1 className="font-semibold mb-5">{title}</h1>
          {children}
        </section>
      </div>
    </div>
  );
}
