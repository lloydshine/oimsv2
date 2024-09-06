import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../providers/UserProvider";
import { links } from "../../lib/globals";
import { isActiveLink } from "../../lib/utils";

export function Sidebar({ open }: { open: boolean }) {
  const { user } = useUser();
  const location = useLocation();

  const position = open ? "left-0" : "-left-[20rem]";

  return (
    <>
      {open && (
        <div className="fixed h-screen md:hidden z-30 w-screen bg-black/80"></div>
      )}
      <div
        className={`${position} z-40 fixed md:static transition-all duration-300 w-[18rem] border-r-2 max-h-screen overflow-y-auto flex flex-col bg-red-950 md:bg-white`}
      >
        <section className="p-2">
          <div className="rounded-lg w-full p-2 border-2 justify-center flex items-center gap-2 bg-slate-200">
            <p className="font-bold">{user.assignedLocation}</p>
            <p>{user.role}</p>
          </div>
        </section>
        <section className="flex flex-col">
          {links.map((link, i) => (
            <Link
              to={link.to}
              key={i}
              className={`flex gap-4 font-medium items-center p-4 ${
                isActiveLink(location.pathname, link.to)
                  ? "bg-red-950 text-white"
                  : "md:text-gray-500 text-gray-300"
              }`}
            >
              <link.icon />
              <p>{link.tag}</p>
            </Link>
          ))}
        </section>
        <section className="flex-1 flex p-2">
          <div className="flex-1 bg-orange-300 rounded-md relative">
            <img
              src="https://img.lazcdn.com/g/p/d1304075bb26dfefda732397e9de792e.png_720x720q80.png"
              alt="image"
              className="w-full h-full object-cover rounded-md"
            />
            <div className="absolute top-0 right-0 m-2">
              <div className="p-1 rounded-full bg-gray-700 text-white">Ad</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
