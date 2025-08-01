"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("please enter your email.");
      return;
    }
    setStatus("submitting...");
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setStatus("");
        setEmail("");
      } else {
        setStatus(data.error || "something went wrong. please try again.");
      }
    } catch (error) {
      setStatus("something went wrong. please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-manrope flex flex-col items-center justify-center relative">
      <Link href="/" className="fixed top-3 left-3 sm:top-6 sm:left-6 z-50 flex items-center">
        <Image src="/logo.png" alt="Offbeats Logo" width={72} height={72} className="w-12 h-12 sm:w-18 sm:h-18 object-contain" priority />
      </Link>
      <section className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 sm:px-8 py-8 sm:py-12 gap-6 sm:gap-8">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold text-center mb-2 lowercase">be the first to hatch 🚀</h1>
        <p className="text-base xs:text-lg text-gray-400 font-manrope font-medium text-center mb-4 lowercase">
          we&apos;re building hatch— an initiative by offbeats under labs for student makers, dreamers, and builders.
        </p>
        {!success ? (
          <>
            <p className="text-sm xs:text-base text-gray-300 text-center mb-2 lowercase">
              enter your email to get notified when we launch and receive exclusive early-bird perks!
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-3 sm:gap-4 items-center justify-center mt-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your best email…"
                className="border-2 border-white/30 rounded-lg px-4 py-3 sm:px-8 sm:py-4 w-full text-white bg-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-manrope text-base sm:text-lg shadow-md"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-white text-black font-syne font-extrabold text-center px-6 py-3 sm:px-8 sm:py-4 rounded-lg min-w-[140px] sm:min-w-[180px] h-[44px] sm:h-[52px] hover:bg-gray-100 hover:text-blue-500 hover:shadow-lg transition-all duration-300 border-2 border-transparent"
              >
                join the waitlist
              </button>
            </form>
            {status && <div className="text-center text-sm mt-2 lowercase">{status}</div>}
            <div className="mt-6 w-full max-w-md mx-auto flex flex-col items-center">
              <div className="text-gray-200 text-sm sm:text-base font-semibold mb-2 text-center lowercase">why join?</div>
              <ul className="text-gray-400 text-xs sm:text-sm list-disc list-inside space-y-1 text-left sm:text-center">
                <li>early access to submit and browse ideas</li>
                <li>invites to exclusive builder sprints and hatchathons</li>
                <li>priority in joining student builder teams</li>
                <li>be featured as a founding hatcher on our launch wall</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 sm:gap-4 mt-4 w-full max-w-md mx-auto">
            <div className="text-lg sm:text-2xl text-blue-400 font-syne font-extrabold text-center lowercase">🎉 you&apos;re on the hatch list!</div>
            <div className="text-sm sm:text-base text-gray-300 text-center lowercase">
              thanks for joining our community. we&apos;ll let you know when hatch by offbeats goes live so you can be among the first to share your ideas and join hatchathons.<br />
              keep an eye on your inbox—we&apos;ll send updates, sneak peeks, and special early-adopter invites soon.
            </div>
          </div>
        )}
        <div className="text-[10px] sm:text-xs text-gray-500 text-center mt-8 lowercase">
          we respect your privacy. no spam. unsubscribe anytime.
        </div>
      </section>
    </div>
  );
}