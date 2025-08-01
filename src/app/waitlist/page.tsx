"use client";
import { useState } from "react";

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
    <div className="min-h-screen bg-black text-white font-manrope flex flex-col items-center justify-center">
      <section className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-8 gap-8">
        <h1 className="text-4xl sm:text-5xl font-syne font-extrabold text-center mb-2 lowercase">be the first to hatch 🚀</h1>
        <p className="text-lg text-gray-400 font-manrope font-medium text-center mb-4 lowercase">
          we&apos;re building hatch— an initiative by offbeats under labs for student makers, dreamers, and builders.
        </p>
        {!success ? (
          <>
            <p className="text-base text-gray-300 text-center mb-2 lowercase">
              enter your email to get notified when we launch and receive exclusive early-bird perks!
            </p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center justify-center mt-2">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your best email…"
                className="border-2 border-white/30 rounded-lg px-8 py-4 w-full text-white bg-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-manrope text-lg shadow-md"
                required
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-white text-black font-syne font-extrabold text-center px-8 py-4 rounded-lg min-w-[180px] h-[52px] hover:bg-gray-100 hover:text-blue-500 hover:shadow-lg transition-all duration-300 border-2 border-transparent"
              >
                join the waitlist
              </button>
            </form>
            {status && <div className="text-center text-sm mt-2 lowercase">{status}</div>}
            <div className="mt-6 w-full max-w-md mx-auto flex flex-col items-center">
              <div className="text-gray-200 text-base font-semibold mb-2 text-center lowercase">why join?</div>
              <ul className="text-gray-400 text-sm list-disc list-inside space-y-1 text-left sm:text-center">
                <li>early access to submit and browse ideas</li>
                <li>invites to exclusive builder sprints and hatchathons</li>
                <li>priority in joining student builder teams</li>
                <li>be featured as a founding hatcher on our launch wall</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-md mx-auto">
            <div className="text-2xl text-blue-400 font-syne font-extrabold text-center lowercase">🎉 you&apos;re on the hatch list!</div>
            <div className="text-base text-gray-300 text-center lowercase">
              thanks for joining our community. we&apos;ll let you know when hatch by offbeats goes live so you can be among the first to share your ideas and join hatchathons.<br />
              keep an eye on your inbox—we&apos;ll send updates, sneak peeks, and special early-adopter invites soon.
            </div>
          </div>
        )}
        <div className="text-xs text-gray-500 text-center mt-8 lowercase">
          we respect your privacy. no spam. unsubscribe anytime.
        </div>
      </section>
    </div>
  );
}