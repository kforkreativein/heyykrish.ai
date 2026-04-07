"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Calendar, Zap, Clock } from "lucide-react";
import OSCard from "@/components/OSCard";
import DownloadModal from "@/components/DownloadModal";
import ContentRenderer from "@/components/ContentRenderer";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedResources from "@/components/RelatedResources";
import type { Resource } from "@/data/resources";

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
  readingTime: string | null;
  relatedResources: Resource[];
}

export default function ResourceDetailClient({ resource, formattedDate, readingTime, relatedResources }: ResourceDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] w-full max-w-[100vw] overflow-x-hidden animate-page-enter">
      {/* Reading Progress Bar */}
      {resource.contentHtml && <ReadingProgress />}
      
      <div className="pt-16 lg:pt-8 pb-16 px-4 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Back Navigation */}
        <Link 
          href="/resources" 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#CC785C] transition-colors mb-6 sm:mb-8 font-mono text-xs sm:text-sm tracking-wider uppercase animate-fade-up"
        >
          <ArrowLeft size={14} className="sm:hidden" />
          <ArrowLeft size={16} className="hidden sm:block" />
          Back to Database
        </Link>

        {/* Content Card */}
        <OSCard className="overflow-hidden animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 sm:mb-8 gap-4 sm:gap-6 w-full">
            <div className="flex-1 w-full min-w-0">
              {/* Category + Date + Reading Time */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 w-full">
                <span className="inline-block bg-[#CC785C]/10 text-[#CC785C] text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-mono w-fit flex-shrink-0">
                  {resource.category}
                </span>
                <div className="flex items-center gap-4 text-zinc-500 text-xs sm:text-sm font-mono flex-shrink-0">
                  <span className="flex items-center gap-2">
                    <Calendar size={12} className="sm:hidden" />
                    <Calendar size={14} className="hidden sm:block" />
                    {formattedDate}
                  </span>
                  {readingTime && (
                    <span className="flex items-center gap-2">
                      <Clock size={12} className="sm:hidden" />
                      <Clock size={14} className="hidden sm:block" />
                      {readingTime}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-5xl text-white mb-3 sm:mb-4 leading-tight break-words w-full">
                {resource.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed break-words w-full">
                {resource.description}
              </p>
            </div>

            {/* Download Button */}
            {resource.downloadUrl && (
              <div className="shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-semibold text-xs sm:text-sm rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] hover:scale-105"
                >
                  <Download size={14} className="sm:hidden" />
                  <Download size={16} className="hidden sm:block" />
                  Download
                </button>
              </div>
            )}
          </div>

          {/* Content */}
          {resource.contentHtml ? (
            <ContentRenderer htmlContent={resource.contentHtml} />
          ) : (
            <div className="text-center py-8 sm:py-12">
              <p className="text-sm sm:text-base text-zinc-400 mb-3 sm:mb-4">
                Detailed content for this resource is coming soon.
              </p>
              <p className="text-xs sm:text-sm text-zinc-500">
                Download the PDF to get started.
              </p>
            </div>
          )}

          {/* Download CTA - Only show if downloadUrl exists */}
          {resource.downloadUrl && (
            <div className="bg-[#121212] border border-white/5 rounded-2xl sm:rounded-[24px] lg:rounded-[32px] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] p-4 sm:p-6 lg:p-8 xl:p-10 mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8 relative overflow-hidden group">
              {/* Subtle glowing accent background on hover */}
              <div className="absolute inset-0 bg-[#CC785C]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
                {/* Decorative Top Icon */}
                <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 rounded-full bg-[#CC785C]/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 border border-[#CC785C]/20">
                  <Zap size={14} className="text-[#CC785C] sm:hidden" />
                  <Zap size={18} className="text-[#CC785C] hidden sm:block lg:hidden" />
                  <Zap size={20} className="text-[#CC785C] hidden lg:block" />
                </div>

                {/* Shortened Headline */}
                <h3 className="font-heading text-lg sm:text-2xl lg:text-3xl text-white font-bold tracking-tight mb-2 sm:mb-3">
                  Want the complete version?
                </h3>
                
                {/* Shortened Copy */}
                <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                  This is a summary. Download the full PDF for deep-dive examples, complete frameworks, and ready-to-use prompts.
                </p>

                {/* Centered Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 sm:gap-2 lg:gap-3 px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full bg-gradient-to-b from-[#CC785C] to-[#b8674a] shadow-[0_0_20px_rgba(204,120,92,0.3)] text-black font-semibold text-xs sm:text-sm lg:text-base hover:brightness-110 hover:scale-[1.03] transition-all duration-300"
                >
                  <Zap size={14} className="text-black sm:hidden" />
                  <Zap size={16} className="text-black hidden sm:block lg:hidden" />
                  <Zap size={18} className="text-black hidden lg:block" />
                  <span className="hidden sm:block">Download Full PDF (Free)</span>
                  <span className="sm:hidden">Get PDF (Free)</span>
                </button>
              </div>
            </div>
          )}
        </OSCard>

        {/* Related Resources */}
        <RelatedResources resources={relatedResources} />
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
