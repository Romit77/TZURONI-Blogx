"use client";

import React from "react";
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
    <>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        <div className=" mt-56 flex min-h-screen flex-col text-white">
          <nav className="container mx-auto flex h-16 items-center px-4 justify-between">
            <Link
              href="/"
              className="text-3xl font-bold  hover:text-gray-300 transition-colors"
            >
              Blogx
            </Link>
            <AuthButtons />
          </nav>

          <main className="flex-1 container mx-auto px-4 py-8 overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-blue-800 to-gray-100 bg-clip-text text-transparent p-10">
                Explore Your Thoughts with Blogx.
              </h1>
              <p className="text-lg font-medium text-gray-400 mb-8">
                Dive into the world of blogging with us. Share your ideas,
                experiences, and perspectives with a global audience.
              </p>
              {hasPosts ? (
                <Link href="/posts">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    View Your Posts
                  </button>
                </Link>
              ) : (
                <p className="text-lg text-gray-400">
                  You haven&apos;t created any posts yet.{" "}
                  <Link href="/posts" className="text-blue-500 hover:underline">
                    Start writing now!
                  </Link>
                </p>
              )}
            </motion.div>
          </main>
        </div>
      </div>
    </>
  );
}
