"use client";

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import React from "react";

export function AuthButtons() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-100">
          {user.emailAddresses[0].emailAddress}
        </span>
        <SignOutButton>
          <Button variant="outline">Sign out</Button>
        </SignOutButton>
      </div>
    );
  }

  return (
    <>
      <SignInButton>
        <Button>Sign in</Button>
      </SignInButton>
    </>
  );
}
