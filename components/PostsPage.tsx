"use client";
import { useState, useEffect } from "react";
import { CreatePost } from "./CreatePost";
import React from "react";

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
