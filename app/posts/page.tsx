"use client";

import { PostList } from "@/components/PostList";
import { CreatePost } from "@/components/CreatePost";
// import { useAuth } from "@clerk/nextjs";

export default function PostsPage() {
  // const { isSignedIn } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Your Posts</h1>
      {/* {isSignedIn && <CreatePost onPostCreated={() => {}} />} */}
      <PostList />
    </div>
  );
}
