import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, MenuIcon, School2Icon } from "lucide-react";
import { Navlinks } from "./Navlinks";
import { adminLinks, appLinks } from "@/lib/globals";
import { LogoutButton } from "../(auth)/LogoutButton";
import { Separator } from "@/components/ui/separator";
import { validateRequest } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function Sidebar() {
  const { user } = await validateRequest();
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-r-0">
        <ScrollArea className="max-h-screen h-screen w-full flex flex-col">
          <SheetHeader className="p-4 flex items-center justify-between flex-row">
            <div className="flex items-end gap-1">
              <School2Icon />
              <h1 className="font-bold">OSAS</h1>
            </div>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <ChevronRight />
              </Button>
            </SheetTrigger>
          </SheetHeader>
          <section className="p-4">
            <Navlinks links={appLinks} />
            <Separator className="my-4" />
            {user?.role === "ADMIN" ? <Navlinks links={adminLinks} /> : null}
            <Separator className="my-4" />
          </section>
          <section className="mt-auto py-10">
            <LogoutButton />
          </section>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
