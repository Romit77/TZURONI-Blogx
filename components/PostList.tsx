"use client";

import { useEffect, useState } from "react";
import { PostView } from "./PostView";
import Image from "next/image";
import { CreatePost } from "./CreatePost";
import { useUser } from "@clerk/nextjs";

type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    email: string;
    name: string | null;
    imageUrl: string | null;
    id: string;
  };
  createdAt: string;
};

export function PostList() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addNewPost = (post: Post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  return (
    <>
      <div className="space-y-6">
        <CreatePost onPostCreated={addNewPost} />
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-6 bg-gray-900/50 rounded-lg border border-gray-800 cursor-pointer hover:bg-gray-900/70 transition-colors"
            onClick={() => setSelectedPost(post)}
          >
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p className="text-gray-400 mb-6 line-clamp-3">{post.content}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {post.author.imageUrl && (
                <Image
                  src={post.author.imageUrl}
                  alt={post.author.name || ""}
                  width={24}
                  height={24}
                  className="rounded-full"
                  layout="fixed"
                />
              )}
              <span>By {post.author.name || post.author.email}</span>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>

      {selectedPost && (
        <PostView
          post={selectedPost}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
}
