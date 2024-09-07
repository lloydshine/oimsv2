import { useAccount } from "../../providers/AccountProvider";

export function Sidebar({ open }: { open: boolean }) {
  const position = open ? "left-0" : "-left-[20rem]";
  const { account } = useAccount();
  return (
    <>
      {open && (
        <div className="fixed h-screen md:hidden z-30 w-screen bg-black/80"></div>
      )}
      <div
        className={`${position} z-40 fixed md:static transition-all duration-300 w-[18rem] border-r-2 max-h-screen overflow-y-auto gap-8 flex flex-col bg-white`}
      >
        {account?.accountType}
      </div>
    </>
  );
}

function UserPanel() {
  return <section></section>;
}

function DepartmentPanel() {
  return <section></section>;
}
