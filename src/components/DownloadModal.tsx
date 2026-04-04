"use client";

import { useState } from "react";
import { X, Download } from "lucide-react";
import OSCard from "./OSCard";

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

      // Trigger download after 1 second
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
      }, 1000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md">
        <OSCard className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
          >
            <X size={20} />
          </button>

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#CC785C]/10 border border-[#CC785C]/20 mb-6">
            <Download className="w-6 h-6 text-[#CC785C]" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-2xl font-bold text-white mb-2">
            Unlock This System
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Drop your email below to receive <strong className="text-zinc-300">{resourceTitle}</strong>, plus get my latest AI workflows delivered to your inbox every Tuesday.
          </p>

          {success ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#CC785C]/10 border border-[#CC785C]/20 mb-4">
                <Download className="w-8 h-8 text-[#CC785C]" />
              </div>
              <p className="text-zinc-300 font-medium">Starting download...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="modal-name"
                  className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="modal-name"
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
                  htmlFor="modal-email"
                  className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="modal-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
                />
              </div>

              {error && (
                <p className="text-sm text-red-400 text-center">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 text-sm font-semibold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Download Now"}
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
