"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AuthButtons } from "@/components/AuthButtons";

export default function Home() {
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Deploy your website in seconds, not hours.
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            With our state-of-the-art, cutting-edge hosting services, you can
            deploy your website in seconds.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                Create account
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg transition-colors">
                Book a call
              </button>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
