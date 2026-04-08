"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import OSCard from "./OSCard";
import NewsletterModal from "./NewsletterModal";
import ContactModal from "./ContactModal";

interface BottomCTAProps {
  badge?: string;
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
  useModal?: boolean; // Optional flag to use newsletter modal instead of link
  useContactModal?: boolean; // Optional flag to use contact modal instead of link
}

export default function BottomCTA({
  badge = "Your Next Step",
  heading,
  subtext,
  buttonText,
  buttonHref,
  useModal = false,
  useContactModal = false,
}: BottomCTAProps) {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <>
      <OSCard className="overflow-hidden">
      {/* Icon in Rounded Container */}
      <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#FF6A25]/10 border border-[#FF6A25]/20 mb-4 sm:mb-6">
        <Zap className="w-5 sm:w-6 h-5 sm:h-6 text-[#FF6A25]" />
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="flex-1">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#FF6A25] bg-[#FF6A25]/10 border border-[#FF6A25]/20 rounded-full">
              {badge}
            </span>
          </div>
          
          {/* Heading in Space Grotesk */}
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            {heading}
          </h2>
          
          {/* Subtext */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mb-6">
            {subtext}
          </p>

          {/* Conditional Button/Link */}
          {useModal ? (
            <button
              onClick={() => setIsNewsletterModalOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-sm text-[#FF6A25] hover:text-[#d88567] transition-colors group uppercase tracking-wider bg-transparent border-none cursor-pointer p-0"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : useContactModal ? (
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-2 font-mono text-sm text-[#FF6A25] hover:text-[#d88567] transition-colors group uppercase tracking-wider bg-transparent border-none cursor-pointer p-0"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-2 font-mono text-sm text-[#FF6A25] hover:text-[#d88567] transition-colors group uppercase tracking-wider"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </OSCard>

    {/* Newsletter Modal - Only render if useModal is true */}
    {useModal && (
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    )}

    {/* Contact Modal - Only render if useContactModal is true */}
    {useContactModal && (
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    )}
    </>
  );
}
