"use client";

import { useState, useEffect, useRef } from "react";
import { X, Mail } from "lucide-react";
import OSCard from "./OSCard";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({
  isOpen,
  onClose,
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      
      // Reset form after 2 seconds and close modal
      setTimeout(() => {
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-backdrop-enter"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div 
        className="absolute inset-0" 
        onClick={onClose}
        aria-hidden="true"
      />
      
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

          {/* Header */}
          <h2 id="contact-modal-title" className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
            Let's Partner
          </h2>
          <p className="text-zinc-400 mb-6 leading-relaxed">
            Tell me about your brand and partnership goals. I'll get back to you within 24 hours.
          </p>

          {success ? (
            <div className="text-center py-6 sm:py-8" role="status" aria-live="polite">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 bg-[#CC785C]/20 rounded-full flex items-center justify-center">
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
              <p className="text-base sm:text-lg font-semibold text-white mb-2">
                Message Sent!
              </p>
              <p className="text-sm sm:text-base text-zinc-400">
                I'll review your partnership proposal and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                  Your Name
                </label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-[24px] text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
                  placeholder="John Smith"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="contact-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-[24px] text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
                  placeholder="john@company.com"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="contact-company" className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="contact-company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-[24px] text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
                  placeholder="AI Tools Inc"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                  Partnership Details
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-[24px] text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all resize-none"
                  placeholder="Tell me about your product and partnership goals..."
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm" role="alert">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed btn-press"
              >
                {isSubmitting ? "Sending..." : "Send Partnership Inquiry"}
              </button>
            </form>
          )}
        </OSCard>
      </div>
    </div>
  );
}