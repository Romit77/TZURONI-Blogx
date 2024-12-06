"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import React from "react";

type PostViewProps = {
  post: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: {
      email: string;
      name: string | null;
      imageUrl: string | null;
    };
    createdAt: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

export function PostView({ post, isOpen, onClose }: PostViewProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: post.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize post");
      }

      const data = await response.json();
      setSummary(data.summary);
      setIsSummaryModalOpen(true);
    } catch (error) {
      console.error("Failed to summarize post:", error);
      alert("Failed to summarize post. Please try again.");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {post.title}
            </DialogTitle>
          </DialogHeader>
          <div className="prose prose-invert max-w-none">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <Button onClick={handleSummarize} disabled={isSummarizing}>
            {isSummarizing ? "Summarizing..." : "Summarize Post"}
          </Button>
          <div className="flex items-center gap-2 mt-6">
            {post.author.imageUrl && (
              <Image
                src={post.author.imageUrl}
                alt={post.author.name || ""}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm text-gray-400">
                By {post.author.name || post.author.email}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Summary</DialogTitle>
          </DialogHeader>
          <div className="prose prose-invert max-w-none">
            <p>{summary}</p>
          </div>
          <Button onClick={() => setIsSummaryModalOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
