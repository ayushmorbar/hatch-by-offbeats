"use client";
import Link from "next/link";
import LikeButton from "./LikeButton";

import { Idea } from "../lib/types";
export default function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <div className="p-6 mb-6 bg-black rounded-xl shadow border border-white/10 text-white font-manrope transition hover:scale-[1.02] hover:shadow-lg">
      <p className="text-lg font-manrope font-medium text-white mb-2">{idea.content}</p>
      <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
        <span>{Array.isArray(idea.tags) ? idea.tags.join(", ") : idea.tags}</span>
        <span>{idea.created_at ? new Date(idea.created_at).toLocaleDateString('en-GB') : ""}</span>
      </div>
      <div className="flex items-center mt-4 space-x-6">
        <LikeButton ideaId={String(idea.id)} initialCount={idea.likes} />
        <Link href={`/ideas/${idea.id}`} className="text-blue-400 hover:underline">💬 Comments</Link>
      </div>
    </div>
  );
}
