import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { UserButton } from "./UserButton";
import {
  Code,
  MessageCircleQuestion,
  NewspaperIcon,
  School2Icon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navlinks } from "./Navlinks";
import { adminLinks, appLinks, userLinks } from "@/lib/globals";
import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "../(auth)/LogoutButton";
import { Button } from "@/components/ui/button";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className="flex h-screen flex-col">
      <section className="z-50 px-5 py-4 border-b-2 w-full flex items-center justify-between gap-4">
        <div className="flex flex-1 md:flex-none items-center gap-4">
          <School2Icon />
          <Input
            placeholder="O Search ..."
            size={25}
            className="rounded-full py-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="md:flex items-center gap-1 hidden mx-4">
            <Button variant="link" className="space-x-2 text-muted-foreground">
              <NewspaperIcon />
              <p>News</p>
            </Button>
            <Button variant="link" className="space-x-2 text-muted-foreground">
              <MessageCircleQuestion />
              <p>Support</p>
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground"
            >
              <Code />
            </Button>
          </div>
          <UserButton />
          <Sidebar />
        </div>
      </section>
      <section className="flex flex-1">
        <div className="hidden md:flex flex-col w-[300px] px-3 py-8 border-r-2">
          <div className="border-2 rounded-full p-2 mb-5 flex items-center gap-1">
            <h1 className="font-bold">{user.assignedOffice}</h1>
            <p>{user.role}</p>
            <p>: {user.username}</p>
          </div>
          <Navlinks links={appLinks} />
          <Separator className="my-4" />
          {user?.role === "ADMIN" ? (
            <>
              <Navlinks links={adminLinks} />
              <Separator className="my-4" />
            </>
          ) : null}
          <Navlinks links={userLinks} />
          <Separator className="my-4" />
          <section className="mt-auto py-8">
            <LogoutButton />
          </section>
        </div>
        <section className="flex-1 flex justify-center items-center bg-secondary px-4">
          <ScrollArea className="max-h-[95%] h-[95%] w-full">
            {children}
          </ScrollArea>
        </section>
      </section>
    </main>
  );
}
