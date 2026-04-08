"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient Background Glow - Red tint for error */}
      <div 
        className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"
        aria-hidden="true"
      />
      
      <div className="text-center max-w-lg animate-fade-up">
        {/* Error Code */}
        <div className="font-mono text-xs tracking-widest text-red-400 mb-4 uppercase">
          Error // 500
        </div>
        
        {/* Error Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        {/* Main Message */}
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
          Something Went Wrong
        </h1>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          An unexpected error occurred. Our systems have been notified and we're working on it.
        </p>
        
        {/* Terminal-style error */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 mb-8 text-left font-mono text-sm overflow-hidden">
          <div className="flex items-center gap-2 text-zinc-600 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <span className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="ml-2">error.log</span>
          </div>
          <div className="text-zinc-500 break-all">
            <span className="text-red-400">Error:</span>{" "}
            <span className="text-zinc-400">{error.message || "Unknown error"}</span>
            {error.digest && (
              <>
                <br />
                <span className="text-zinc-600">Digest: {error.digest}</span>
              </>
            )}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 text-sm font-semibold text-black bg-gradient-to-b from-[#FF6A25] to-[#FF6A25] rounded-full hover:shadow-[0_0_25px_rgba(255,106,37,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(255,106,37,0.3)] btn-press focus-ring"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 btn-press focus-ring"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
