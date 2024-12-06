"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthButtons } from "@/components/AuthButtons";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useUser();
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(() => {
    const checkPosts = async () => {
      if (user) {
        const response = await fetch(`/api/posts?authorId=${user.id}`);
        const data = await response.json();
        setHasPosts(data.length > 0);
      }
    };
    checkPosts();
  }, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-900 text-white">
      <header className="border-b border-gray-800">
        <nav className="container mx-auto flex h-16 items-center px-4 justify-between">
          <Link
            href="/"
            className="text-xl font-bold hover:text-gray-300 transition-colors"
          >
            Your Blog
          </Link>
          <AuthButtons />
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-800 via-black to-gray-900 bg-clip-text text-transparent">
            Deploy your website in seconds, not hours.
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            With our state-of-the-art, cutting-edge hosting services, you can
            deploy your website in seconds.
          </p>
          {hasPosts ? (
            <Link href="/posts">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Manage Your Posts
              </button>
            </Link>
          ) : (
            <p className="text-lg text-gray-400">
              You haven't created any posts yet.{" "}
              <Link href="/posts" className="text-blue-500 hover:underline">
                Create a post now!
              </Link>
            </p>
          )}
        </motion.div>
      </main>
    </div>
  );
}
