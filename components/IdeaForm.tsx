"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase } from "../lib/supabaseClient";

export default function IdeaForm() {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { error } = await supabase.from("ideas").insert({
      content: content.trim(),
      tags: tags.split(",").map((t) => t.trim()),
    });
    if (!error) {
      await supabase.from("metrics").insert({ action_type: "submit" });
      toast.success("Idea hatched!");
      router.push("/ideas");
    } else {
      toast.error("Failed to submit idea.");
    }
    setContent("");
    setTags("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        maxLength={170}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your next big idea (≤170 chars)…"
        className="w-full p-2 border border-white/20 rounded bg-black text-white font-manrope font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />
      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
        className="w-full p-2 border border-white/20 rounded bg-black text-white font-manrope font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button type="submit" className="px-4 py-2 bg-white text-black rounded font-syne font-extrabold border border-black border-dotted hover:bg-blue-400 hover:text-white transition">
        Hatch It →
      </button>
    </form>
  );
}
