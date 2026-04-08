import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div 
        className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-[#FF6A25]/5 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"
        aria-hidden="true"
      />
      
      <div className="text-center max-w-lg animate-fade-up">
        {/* Error Code */}
        <div className="font-mono text-xs tracking-widest text-[#FF6A25] mb-4 uppercase">
          Error // 404
        </div>
        
        {/* Glitchy 404 Display */}
        <h1 className="font-heading text-[120px] sm:text-[180px] font-bold text-white/10 leading-none mb-[-20px] sm:mb-[-40px] select-none">
          404
        </h1>
        
        {/* Main Message */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          The resource you're looking for has been moved, deleted, or never existed. 
          Let's get you back on track.
        </p>
        
        {/* Terminal-style message */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 mb-8 text-left font-mono text-sm">
          <div className="flex items-center gap-2 text-zinc-600 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500/50" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <span className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="ml-2">terminal</span>
          </div>
          <div className="text-zinc-500">
            <span className="text-[#FF6A25]">$</span> curl https://heyykrish.ai/...
            <br />
            <span className="text-red-400">Error:</span> Resource not found
            <br />
            <span className="text-zinc-600">Redirecting to homepage...</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 text-sm font-semibold text-black bg-gradient-to-b from-[#FF6A25] to-[#FF6A25] rounded-full hover:shadow-[0_0_25px_rgba(255,106,37,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(255,106,37,0.3)] btn-press focus-ring"
          >
            Go Home
          </Link>
          <Link
            href="/resources"
            className="px-6 py-3 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 btn-press focus-ring"
          >
            Browse Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
