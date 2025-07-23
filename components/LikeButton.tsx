"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LikeButton({ ideaId, initialCount }: { ideaId: string, initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [disabled, setDisabled] = useState(false);

  async function handleLike() {
    setDisabled(true);
    const { error } = await supabase
      .from("ideas")
      .update({ likes: count + 1 })
      .eq("id", ideaId);
    if (!error) {
      setCount(count + 1);
      await supabase.from("metrics").insert({
        action_type: "like",
        idea_id: ideaId,
      });
    }
    setDisabled(false);
  }

  return (
    <button
      onClick={handleLike}
      disabled={disabled}
      className="flex items-center space-x-1 text-blue-400 font-syne font-extrabold px-3 py-1 rounded border border-blue-400 bg-white/8 hover:bg-blue-400 hover:text-white transition"
    >
      <span>❤️</span>
      <span>{count}</span>
    </button>
  );
}
