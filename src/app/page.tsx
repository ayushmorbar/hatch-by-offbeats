
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

  // Redirect to /waitlist page
  if (typeof window !== "undefined") {
    window.location.replace("/waitlist");
    return null;
  }
  return null;
}
