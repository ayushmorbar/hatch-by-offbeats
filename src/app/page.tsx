"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string>("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen bg-black text-white font-manrope flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/30 via-blue-500/10 to-transparent rounded-full blur-3xl transition-all duration-500 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-slide-right"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-slide-down"></div>
        </div>

        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-${2 + (i % 4)} h-${2 + (i % 4)} bg-gradient-to-br from-blue-400/40 to-purple-400/40 rounded-full animate-float-${i % 4} blur-sm`}
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 8)}%`,
            }}
          />
        ))}

        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-500/20 animate-pulse"></div>
      </div>

      <section className={`flex flex-col items-center justify-center h-screen w-full max-w-2xl mx-auto p-8 gap-12 relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        <div className="text-center space-y-6 relative">
          <div className="relative inline-block">
            <h1 className="text-7xl md:text-8xl font-syne font-black text-center relative z-10">
              <span className="bg-gradient-to-r from-white via-blue-200 via-purple-200 to-white bg-clip-text text-transparent animate-gradient-shift bg-[length:400%_400%]">
                hatch by offbeats
              </span>
            </h1>
            
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 blur-2xl animate-pulse opacity-60"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl animate-pulse delay-500"></div>
          </div>
          
          <p className="text-xl text-gray-300 font-manrope font-medium max-w-lg mx-auto leading-relaxed animate-fade-in-up delay-300">
            Something <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">extraordinary</span> is coming. 
            Be the first to experience the future.
          </p>
        </div>

        <div className="w-full relative group animate-fade-in-up delay-500">

          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-3xl blur opacity-40 group-hover:opacity-70 transition-all duration-700"></div>
          
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-blue-500/50 animate-border-spin">
            <div className="w-full h-full bg-black/50 rounded-3xl"></div>
          </div>

          <div className="relative bg-black/20 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <div className="absolute top-6 right-6 w-3 h-3 bg-blue-400/50 rounded-full animate-ping"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-purple-400/50 rounded-full animate-ping delay-700"></div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 items-center relative z-10">
              <div className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
                
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email to join the revolution"
                  className="w-full px-8 py-6 min-h-[70px] text-white text-lg bg-gradient-to-r from-gray-900/70 to-gray-800/70 backdrop-blur-sm border-2 border-gray-600/30 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500/70 hover:border-gray-400/50 transition-all duration-300 font-medium shadow-inner focus:scale-[1.01] hover:shadow-2xl relative z-10"
                  required
                />
                
               
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
              </div>

              <button
                type="submit"
                disabled={status === "Submitting..."}
                className="w-full relative group overflow-hidden"
              >
              
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl animate-gradient-shift bg-[length:400%_400%]"></div>
                
              
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                
          
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-syne font-black text-xl tracking-wider px-12 py-6 rounded-2xl min-h-[70px] flex items-center justify-center transform group-hover:scale-[1.02] group-active:scale-[0.98] transition-all duration-200 border border-white/20">
                  
                 
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                 
                  <span className="relative z-10 flex items-center gap-3">
                    {status === "Submitting..." ? (
                      <>
                        <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="animate-pulse">JOINING THE FUTURE...</span>
                      </>
                    ) : (
                      <>
                        <span>SECURE MY SPOT</span>
                        <span className="text-2xl group-hover:translate-x-1 transition-transform duration-200">🚀</span>
                      </>
                    )}
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>

        {status && (
          <div className={`text-center text-base px-6 py-4 rounded-2xl backdrop-blur-sm animate-scale-in border ${
            status.includes("Thanks") || status.includes("notified") 
              ? "text-green-300 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 shadow-green-500/20" 
              : status.includes("Submitting") 
                ? "text-blue-300 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 shadow-blue-500/20"
                : "text-red-300 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 shadow-red-500/20"
          } shadow-2xl`}>
            {status}
          </div>
        )}

        <div className="text-center space-y-6 animate-fade-in-up delay-700">
          <div className="flex items-center justify-center gap-3 text-gray-200">
            <span className="text-2xl animate-pulse">⭐</span>
            <span className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Join many visionaries already waiting
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 group hover:text-emerald-400 transition-all duration-300 cursor-pointer">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">🛡️</span>
              <span className="font-medium">Zero Spam Guarantee</span>
            </div>
            <div className="flex items-center gap-2 group hover:text-cyan-400 transition-all duration-300 cursor-pointer">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">⚡</span>
              <span className="font-medium">Instant Updates</span>
            </div>
            <div className="flex items-center gap-2 group hover:text-purple-400 transition-all duration-300 cursor-pointer">
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">🎯</span>
              <span className="font-medium">VIP Early Access</span>
            </div>
          </div>
        </div>
      </section>

      
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(360deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-360deg); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-gradient-shift { animation: gradient-shift 4s ease infinite; }
        .animate-border-spin { animation: border-spin 8s linear infinite; }
        .animate-slide-right { animation: slide-right 8s linear infinite; }
        .animate-slide-down { animation: slide-down 10s linear infinite; }
        .animate-float-0 { animation: float-0 6s ease-in-out infinite; }
        .animate-float-1 { animation: float-1 7s ease-in-out infinite; }
        .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
        .animate-float-3 { animation: float-3 5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.5s ease-out forwards; }
        
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </div>
  );
}
