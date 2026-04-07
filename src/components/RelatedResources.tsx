import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Resource } from "@/data/resources";

interface RelatedResourcesProps {
  resources: Resource[];
}

export default function RelatedResources({ resources }: RelatedResourcesProps) {
  if (resources.length === 0) return null;

  return (
    <section className="mt-12 sm:mt-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
          Related Resources
        </h2>
        <Link
          href="/resources"
          className="text-[#CC785C] text-xs sm:text-sm font-medium hover:text-[#b8674a] transition-colors flex items-center gap-1.5 group font-mono uppercase tracking-wider"
        >
          View All
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {resources.map((resource, index) => (
          <Link
            key={resource.id}
            href={`/resources/${resource.slug}`}
            className="group bg-[#121212] border border-white/5 rounded-2xl p-5 hover:border-[#CC785C]/30 transition-all duration-300 card-hover-lift animate-fade-up"
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            {/* Category Tag */}
            <span className="inline-block bg-[#CC785C]/10 text-[#CC785C] text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider font-mono mb-3">
              {resource.category}
            </span>

            {/* Title */}
            <h3 className="font-heading text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-[#CC785C] transition-colors line-clamp-2">
              {resource.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
              {resource.description}
            </p>

            {/* Arrow indicator */}
            <div className="mt-4 flex items-center gap-1.5 text-[#CC785C] text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              Read More
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
