"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail, Check } from "lucide-react";
import OSCard from "./OSCard";
import CenteredModal from "./CenteredModal";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  resourceId: string;
  downloadUrl?: string;
}

export default function DownloadModal({
  isOpen,
  onClose,
  resourceTitle,
  resourceId,
  downloadUrl,
}: DownloadModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management: trap focus within modal
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the first input after a short delay for animation
      setTimeout(() => firstInputRef.current?.focus(), 100);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      // Return focus to previous element
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
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
      const response = await fetch("/api/download-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          resourceId,
          resourceTitle,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setSuccess(true);

      // Trigger download after 1.5 seconds to show success animation
      setTimeout(() => {
        if (downloadUrl) {
          window.open(downloadUrl, "_blank");
        }
        onClose();
        // Reset form
        setTimeout(() => {
          setName("");
          setEmail("");
          setSuccess(false);
        }, 300);
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <CenteredModal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy="download-modal-title"
    >
      <div ref={modalRef}>
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
          <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#FF6A25]/10 border border-[#FF6A25]/20 mb-4 sm:mb-6">
            <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-[#FF6A25]" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2 id="download-modal-title" className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
            Join the Newsletter
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Drop your email below to get my latest AI workflows, tools, and prompts delivered to your inbox every Tuesday. Zero fluff.
          </p>

          {success ? (
            <div className="text-center py-6 sm:py-8" role="status" aria-live="polite">
              <div className="inline-flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#FF6A25]/20 border border-[#FF6A25]/30 mb-4">
                <svg 
                  className="w-6 sm:w-8 h-6 sm:h-8 text-[#FF6A25]" 
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
                  htmlFor="download-modal-name"
                  className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
                >
                  Your Name
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="download-modal-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6A25] focus:shadow-[0_0_20px_rgba(255,106,37,0.2)] transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="download-modal-email"
                  className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="download-modal-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6A25] focus:shadow-[0_0_20px_rgba(255,106,37,0.2)] transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center" role="alert">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 text-sm font-semibold text-black bg-gradient-to-b from-[#FF6A25] to-[#FF6A25] rounded-full hover:shadow-[0_0_25px_rgba(255,106,37,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(255,106,37,0.3)] disabled:opacity-50 disabled:cursor-not-allowed btn-press"
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
    </CenteredModal>
  );
}
