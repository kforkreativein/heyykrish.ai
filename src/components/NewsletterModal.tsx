"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail } from "lucide-react";
import OSCard from "./OSCard";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({
  isOpen,
  onClose,
}: NewsletterModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setTimeout(() => firstInputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };
    window.addEventListener("keydown", handleTabKey);
    return () => window.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          source: "resources-page",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset form
        setTimeout(() => {
          setName("");
          setEmail("");
          setSuccess(false);
        }, 300);
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
    >
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div ref={modalRef} className="relative w-full max-w-md modal-content-enter">
        <OSCard className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5 focus-ring"
          >
            <X size={20} aria-hidden="true" />
          </button>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#CC785C]/10 border border-[#CC785C]/20 mb-4 sm:mb-6">
            <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-[#CC785C]" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2 id="newsletter-modal-title" className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
            Join the Newsletter
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Drop your email below to get my latest AI workflows, tools, and prompts delivered to your inbox every Tuesday. Zero fluff.
          </p>

          {success ? (
            <div className="text-center py-6 sm:py-8" role="status" aria-live="polite">
              <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#CC785C]/20 border border-[#CC785C]/30 mb-4">
                <svg 
                  className="w-6 sm:w-8 h-6 sm:h-8 text-[#CC785C]" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline 
                    points="20 6 9 17 4 12" 
                    style={{ 
                      strokeDasharray: 50, 
                      strokeDashoffset: 0,
                      animation: "checkmark-draw 0.4s ease-out forwards"
                    }} 
                  />
                </svg>
              </div>
              <p className="text-zinc-300 font-medium">Subscribed! Check your email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="newsletter-modal-name"
                  className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
                >
                  Your Name
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="newsletter-modal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="newsletter-modal-email"
                  className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="newsletter-modal-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center" role="alert">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 text-sm font-semibold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed btn-press"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe Now"}
              </button>

              <p className="text-xs text-zinc-500 text-center">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          )}
        </OSCard>
      </div>
    </div>
  );
}
