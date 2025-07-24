"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-manrope flex items-center justify-center p-4">
    
      <section className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-10 lg:gap-16">
        
        {/* Left Panel: Text Content */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6">
          <h1 className="text-4xl sm:text-5xl font-syne font-extrabold lowercase leading-tight">
            hatch by offbeats
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-manrope font-medium max-w-md">
            To ignite students and first-time makers to share raw ideas, learn out loud, and collaboratively build projects that solve real-world problems.
          </p>
    
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link 
              href="/ideas/new" 
              className="inline-flex items-center justify-center bg-white text-black font-syne font-extrabold text-center px-8 py-4 rounded-lg min-w-[180px] h-[52px] hover:bg-gray-100 hover:shadow-lg transition-all duration-300 border-2 border-transparent"
            >
              Hatch It →
            </Link>
            <Link 
              href="/ideas" 
              className="inline-flex items-center justify-center bg-transparent text-white font-syne font-extrabold border-2 border-white/70 hover:bg-white hover:text-black hover:shadow-lg transition-all duration-300 text-center px-8 py-4 rounded-lg min-w-[180px] h-[52px]"
            >
              Browse Sparks
            </Link>
          </div>
        </div>
        
        {/* Right Panel: Image */}
        <div className="flex-1 flex items-center justify-center">
  <div className="relative animate-float">
    <div className="absolute -inset-4 bg-blue-500/30 rounded-full blur-3xl opacity-60"></div>
    
    <Image 
      src="/egg-crack.gif" 
      alt="An egg hatching an idea" 
      width={600} 
      height={600} 
      className="relative w-full h-auto max-w-sm object-contain rounded-xl" 
    />
  </div>
</div>
      </section>
    </main>
  );
}