"use client";

import { useState, useEffect } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress(); // Initial call

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 lg:left-[276px]"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div 
        className="h-full bg-gradient-to-r from-[#CC785C] to-[#b8674a] transition-all duration-150 ease-out shadow-[0_0_10px_rgba(204,120,92,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
