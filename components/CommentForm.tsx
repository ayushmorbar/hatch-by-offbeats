"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface CommentFormProps {
  ideaId: string;
}

export default function CommentForm({ ideaId }: CommentFormProps) {
  const [content, setContent] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await supabase.from("comments").insert({ idea_id: ideaId, content });
    await supabase.from("metrics").insert({
      action_type: "comment",
      idea_id: ideaId,
    });
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment…"
        className="w-full p-2 border border-white/20 rounded bg-black text-white font-manrope font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />
      <button type="submit" className="px-4 py-2 bg-white text-black rounded font-syne font-extrabold border border-black border-dotted hover:bg-blue-400 hover:text-white transition">
        Post Comment
      </button>
    </form>
  );
}
