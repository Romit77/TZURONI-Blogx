"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user?.email}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
