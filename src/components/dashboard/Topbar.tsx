import { Code2Icon, File, MenuIcon, X } from "lucide-react";

export function Topbar({
  handleToggle,
  open,
}: {
  handleToggle: (open: boolean) => void;
  open: boolean;
}) {
  return (
    <div className="absolute w-full px-6 h-[80px] flex items-center gap-4 justify-between border-b-2">
      <div className="flex items-center gap-4 flex-1 md:flex-none">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="logo" className="h-10 w-10" />
          <h1 className="font-bold text-red-950">OIMS</h1>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="px-3 py-1 rounded-full text-black border-2 w-[300px] md:block hidden"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-4 text-red-950">
          <div className="flex items-center gap-2">
            <Code2Icon />
            <h1>Github</h1>
          </div>
          <div className="flex items-center gap-2">
            <File />
            <h1>Documentation</h1>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full text-white bg-red-950 flex items-center justify-center">
          <p>LS</p>
        </div>
        <div className="md:hidden" onClick={() => handleToggle(!open)}>
          {open ? <X /> : <MenuIcon />}
        </div>
      </div>
    </div>
  );
}
