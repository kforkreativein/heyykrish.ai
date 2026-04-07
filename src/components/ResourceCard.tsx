import Link from "next/link";
import OSCard from "./OSCard";

interface ResourceCardProps {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: string;
  link?: string;
}

export default function ResourceCard({
  slug,
  title,
  description,
  category,
  link,
}: ResourceCardProps) {
  const href = link || (slug ? `/resources/${slug}` : "#");

  return (
    <Link href={href} className="group block h-full">
      <OSCard className="h-full flex flex-col hover:border-[#CC785C]/20 transition-all duration-300 card-hover-lift">
        {/* Pill-Shaped Category Tag */}
        <span className="inline-block bg-[#CC785C]/10 text-[#CC785C] text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-mono mb-4 w-fit group-hover:bg-[#CC785C]/20 transition-colors duration-300">
          {category}
        </span>

        {/* Title in Space Grotesk */}
        <h3 className="font-heading text-xl sm:text-2xl text-white mt-2 mb-3 group-hover:text-[#CC785C] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 mb-6 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Terminal-Style Metadata Row */}
        <div className="flex justify-between items-center mt-auto mb-4 pt-4 border-t border-white/5 font-mono text-[10px] tracking-[0.2em] uppercase text-zinc-500">
          <span>[BUILD // STABLE]</span>
          <span className="text-[#CC785C] group-hover:animate-pulse">Access // Free</span>
        </div>

        {/* Pill-Shaped Action Button */}
        <span 
          className="w-full py-2.5 sm:py-3 px-5 sm:px-6 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-semibold text-xs sm:text-sm rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] group-hover:scale-[1.02] group-hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] text-center block btn-press"
          role="presentation"
          aria-hidden="true"
        >
          View Resource
        </span>
      </OSCard>
    </Link>
  );
}
