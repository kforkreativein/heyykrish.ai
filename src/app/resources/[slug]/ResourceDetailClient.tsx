"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Calendar } from "lucide-react";
import OSCard from "@/components/OSCard";
import DownloadModal from "@/components/DownloadModal";

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
            <div 
              className="prose prose-dark max-w-none"
              dangerouslySetInnerHTML={{ __html: resource.contentHtml }}
              suppressHydrationWarning={true}
            />
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