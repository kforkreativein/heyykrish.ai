import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Calendar, Sparkles } from "lucide-react";
import { resources, getResourceBySlug } from "@/data/resources";

// Generate static params for all resources
export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

// Category badge colors with gradient accents
const categoryColors: Record<string, string> = {
  Prompts: "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Tools: "bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-400 border-pink-500/20",
  Learning: "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Marketing: "bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-400 border-orange-500/20",
  Automations: "bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-rose-400 border-rose-500/20",
  "Video Editing": "bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-400 border-red-500/20",
};

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const colorClass =
    categoryColors[resource.category] ||
    "bg-zinc-700/50 text-zinc-400 border-zinc-600";

  // Format date
  const formattedDate = new Date(resource.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E17F62]/5 via-zinc-950 to-purple-500/5 opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E17F62]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative pt-8 lg:pt-16 pb-16 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#E17F62] transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Resources
            </Link>

            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border backdrop-blur-sm ${colorClass}`}
                >
                  <Sparkles className="w-3 h-3" />
                  {resource.category}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-zinc-500">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-zinc-50 mb-6 tracking-tight leading-[1.1]">
                {resource.title}
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
                {resource.description}
              </p>
            </header>

            {/* Primary CTA with Gradient */}
            <div className="mb-12">
              <div className="relative group inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#E17F62] to-orange-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <a
                  href={resource.downloadUrl || '#'}
                  download={resource.downloadUrl ? true : undefined}
                  target={resource.downloadUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-zinc-950 bg-gradient-to-r from-[#E17F62] to-orange-600 rounded-xl hover:scale-105 transition-transform shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download Free Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          {resource.contentHtml ? (
            <article className="mb-16">
              {/* 
                SECURITY NOTE: dangerouslySetInnerHTML is used here to render 
                Claude-generated HTML content. This is safe ONLY because:
                1. The content comes from a trusted source (the developer/Claude)
                2. It is NOT user-submitted content
                3. The content is stored in our codebase, not a database
                
                NEVER use this pattern with untrusted or user-generated content
                as it can enable XSS (Cross-Site Scripting) attacks.
              */}
              <div
                className="prose-dark max-w-none"
                dangerouslySetInnerHTML={{ __html: resource.contentHtml }}
              />
            </article>
          ) : (
            <article className="mb-16 prose-dark">
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center">
                <p className="text-zinc-400 mb-4">
                  Detailed content for this resource is coming soon.
                </p>
                <p className="text-zinc-500 text-sm">
                  In the meantime, download the PDF to get started.
                </p>
              </div>
            </article>
          )}

          {/* Bottom CTA Card */}
          <div className="relative">
            {/* Background gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E17F62]/20 to-purple-500/20 rounded-3xl blur-2xl -z-10"></div>
            
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 rounded-3xl p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E17F62]/10 text-[#E17F62] text-xs font-semibold rounded-full mb-4">
                    <Sparkles className="w-3 h-3" />
                    FREE RESOURCE
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-zinc-50 mb-3">
                    Ready to level up?
                  </h3>
                  <p className="text-zinc-400 text-lg">
                    Download the complete guide and start implementing these strategies today.
                  </p>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#E17F62] to-orange-600 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <a
                    href={resource.downloadUrl || '#'}
                    download={resource.downloadUrl ? true : undefined}
                    target={resource.downloadUrl ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-zinc-950 bg-gradient-to-r from-[#E17F62] to-orange-600 rounded-xl hover:scale-105 transition-transform whitespace-nowrap shadow-xl"
                  >
                    <Download className="w-5 h-5" />
                    Get the Full Guide
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
