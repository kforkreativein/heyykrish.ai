"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        setProgress(Number(((currentScrollY / scrollHeight) * 100).toFixed(2)));
      } else {
        setProgress(0);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-1.5 bg-white/5 z-50 lg:left-[276px]"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-gradient-to-r from-[#FF6A25] to-[#ff8a5e] shadow-[0_-2px_15px_rgba(255,106,37,0.6)] transition-all duration-150 ease-out rounded-r-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}