"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export default function TypewriterText({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 1500,
}: TypewriterTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // If reduced motion is preferred, show full word without animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setCurrentText(words[currentWordIndex]);
    }
  }, [prefersReducedMotion, currentWordIndex, words]);

  useEffect(() => {
    // Skip animation if reduced motion is preferred
    if (prefersReducedMotion) {
      // Just cycle through words slowly without typing animation
      const timeout = setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, pauseDuration * 2);
      return () => clearTimeout(timeout);
    }

    const currentWord = words[currentWordIndex];

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }

    if (!isDeleting && currentText === currentWord) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setCurrentText((prev) => {
          if (isDeleting) {
            return currentWord.substring(0, prev.length - 1);
          } else {
            return currentWord.substring(0, prev.length + 1);
          }
        });
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration, prefersReducedMotion]);

  return (
    <span className="inline-block" aria-label={`Rotating text: ${words.join(", ")}`}>
      <span className="text-[#CC785C] font-bold">{currentText}</span>
      {!prefersReducedMotion && (
        <span className="animate-pulse ml-1 text-[#CC785C]" aria-hidden="true">|</span>
      )}
    </span>
  );
}
