"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Calendar, Zap } from "lucide-react";
import OSCard from "@/components/OSCard";
import DownloadModal from "@/components/DownloadModal";
import ContentRenderer from "@/components/ContentRenderer";

interface ResourceDetailClientProps {
  resource: {
    id: string;
    title: string;
    description: string;
    category: string;
    contentHtml?: string;
    downloadUrl?: string;
  };
  formattedDate: string;
}

export default function ResourceDetailClient({ resource, formattedDate }: ResourceDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="p-4 lg:p-8 max-w-6xl mx-auto">
        {/* Back Navigation */}
        <Link 
          href="/resources" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#CC785C] transition-colors mb-8 font-mono text-sm tracking-wider uppercase"
        >
          <ArrowLeft size={16} />
          Back to Database
        </Link>

        {/* Content Card */}
        <OSCard>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-6">
            <div className="flex-1">
              {/* Category + Date */}
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block bg-[#CC785C]/10 text-[#CC785C] text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                  {resource.category}
                </span>
                <div className="flex items-center gap-2 text-zinc-500 text-sm font-mono">
                  <Calendar size={14} />
                  {formattedDate}
                </div>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl lg:text-5xl text-white mb-4 leading-tight">
                {resource.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-zinc-400 leading-relaxed">
                {resource.description}
              </p>
            </div>

            {/* Download Button */}
            {resource.downloadUrl && (
              <div className="shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-semibold text-sm rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] hover:scale-105"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {resource.contentHtml ? (
            <ContentRenderer htmlContent={resource.contentHtml} />
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400 mb-4">
                Detailed content for this resource is coming soon.
              </p>
              <p className="text-zinc-500 text-sm">
                Download the PDF to get started.
              </p>
            </div>
          )}

          {/* Download CTA - Only show if downloadUrl exists */}
          {resource.downloadUrl && (
            <div className="bg-[#121212] border border-white/5 rounded-[32px] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] p-8 md:p-10 mt-16 mb-8 relative overflow-hidden group">
              {/* Subtle glowing accent background on hover */}
              <div className="absolute inset-0 bg-[#CC785C]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
                {/* Decorative Top Icon */}
                <div className="w-12 h-12 rounded-full bg-[#CC785C]/10 flex items-center justify-center mb-5 border border-[#CC785C]/20">
                  <Zap size={20} className="text-[#CC785C]" />
                </div>

                {/* Shortened Headline */}
                <h3 className="font-heading text-3xl text-white font-bold tracking-tight mb-3">
                  Want the complete version?
                </h3>
                
                {/* Shortened Copy */}
                <p className="text-zinc-400 text-base mb-8">
                  This is a summary. Download the full PDF for deep-dive examples, complete frameworks, and ready-to-use prompts.
                </p>

                {/* Centered Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-b from-[#CC785C] to-[#b8674a] shadow-[0_0_20px_rgba(204,120,92,0.3)] text-black font-semibold text-base hover:brightness-110 hover:scale-[1.03] transition-all duration-300"
                >
                  <Zap size={18} className="text-black" />
                  Download Full PDF (Free)
                </button>
              </div>
            </div>
          )}
        </OSCard>
      </div>

      {/* Download Modal */}
      <DownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceTitle={resource.title}
        resourceId={resource.id}
        downloadUrl={resource.downloadUrl}
      />
    </div>
  );
}
