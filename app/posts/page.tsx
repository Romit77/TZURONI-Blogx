"use client";

import { PostList } from "@/components/PostList";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export default function PostsPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Your Posts</h1>
      {!user && (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            You need to be signed in to create posts.
          </p>
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      )}
      <PostList />
    </div>
  );
}
