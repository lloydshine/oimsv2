"use client";

import { useState, useTransition } from "react";
import { login } from "@/actions/auth.action";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await login(username, password);
      toast({
        title: "Authentication",
        description: res.log ? res.log : "Log in successfully!",
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center gap-4 w-full p-10"
    >
      <section className="w-full">
        <h1 className="text-3xl font-bold">Login</h1>
      </section>
      <section className="space-y-4 w-full">
        <div className="space-y-4">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end items-center gap-1">
          <Button type="submit" size="lg" variant="link">
            Forgot Password
          </Button>
          <Button type="submit" size="lg" disabled={isPending}>
            Login
          </Button>
        </div>
      </section>
    </form>
  );
}
