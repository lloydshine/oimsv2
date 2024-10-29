"use client";

import React, { useTransition } from "react";
import { Button } from "../../components/ui/button";
import { logout } from "@/actions/auth.action";
import { toast } from "../../components/ui/use-toast";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await logout();
      if (res?.log) {
        toast({
          title: "Authentication",
          description: res.log,
        });
      }
    });
  };

  return (
    <Button
      variant="secondary"
      className="w-full"
      onClick={handleClick}
      disabled={isPending}
    >
      Sign Out
    </Button>
  );
}
