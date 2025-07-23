
"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [stats, setStats] = useState<{ ideas: number; comments: number; likes: number }>({ ideas: 0, comments: 0, likes: 0 });
  const [featured, setFeatured] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStats() {
      const [{ count: ideas }, { count: comments }, { data: likesData }, { data: featuredIdeas }] = await Promise.all([
        supabase.from("ideas").select("id", { count: "exact", head: true }),
        supabase.from("comments").select("id", { count: "exact", head: true }),
        supabase.from("ideas").select("likes"),
        supabase.from("ideas").select("id, content, tags, likes").order("likes", { ascending: false }).limit(5),
      ]);
      const likes = Array.isArray(likesData) ? likesData.reduce((acc, idea) => acc + (idea.likes || 0), 0) : 0;
      setStats({ ideas: ideas ?? 0, comments: comments ?? 0, likes });
      setFeatured(featuredIdeas ?? []);
    }
    fetchStats();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setStatus("Submitting...");
    supabase.from("emails").insert({ email }).then(({ error }) => {
      if (error) {
        setStatus("Something went wrong. Please try again.");
      } else {
        setStatus("Thanks! You'll be notified when we launch.");
        setEmail("");
      }
    });
  }

  return (
    <div className="min-h-screen bg-black text-white font-manrope flex flex-col">
      {/* Hero Split Layout */}
      <section className="flex flex-col md:flex-row items-center justify-center h-screen max-w-6xl mx-auto p-8 gap-12">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col justify-center items-start gap-8">
          <h1 className="text-5xl font-syne font-extrabold lowercase leading-tight">hatch by offbeats</h1>
          <p className="text-lg text-gray-400 font-manrope font-medium max-w-md mb-4">
            To ignite students and first-time makers to share raw ideas, learn out loud, and collaboratively build projects that solve real-world problems.
          </p>
          <div className="flex gap-4">
            <Link href="/ideas/new" className="px-6 py-3 bg-white text-black rounded font-syne font-extrabold border border-black border-dotted hover:bg-blue-400 hover:text-white transition">Hatch It →</Link>
            <Link href="/ideas" className="px-6 py-3 bg-transparent text-white rounded font-syne font-extrabold border border-white border-dotted hover:bg-blue-400 hover:text-white transition">Browse Sparks</Link>
          </div>
        </div>
        {/* Right Panel */}
        <div className="flex-1 flex items-center justify-center relative">
          <img src="/egg-crack.gif" alt="Egg cracking" className="w-full h-[400px] object-cover rounded-xl border border-white/10 shadow-lg bg-white/8" />
        </div>
      </section>
    </div>
  );
}
