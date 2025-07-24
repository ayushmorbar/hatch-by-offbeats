
"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("");


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("Please enter your email.");
      return;
    }
    setStatus("Submitting...");
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await response.json();
      if (response.ok) {
        setStatus(data.message || "Thanks! You'll be notified when we launch.");
        setEmail("");
      } else {
        setStatus(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-manrope flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center h-screen w-full max-w-xl mx-auto p-8 gap-8">
        <h1 className="text-5xl font-syne font-extrabold text-center mb-4">hatch by offbeats</h1>
        <p className="text-lg text-gray-400 font-manrope font-medium text-center mb-8">
          We&apos;re not live yet! Get notified when we launch and be the first to join the community.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email to get notified"
            className="border border-white/20 rounded px-4 py-3 w-full text-white bg-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <button
            type="submit"
            className="bg-blue-400 text-black px-6 py-3 rounded font-syne font-extrabold shadow hover:bg-white hover:text-blue-400 transition"
          >
            Notify Me
          </button>
        </form>
        {status && <div className="text-center text-sm mt-2">{status}</div>}
      </section>
    </div>
  );
}
