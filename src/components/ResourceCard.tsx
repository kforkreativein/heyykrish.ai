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
      <OSCard className="h-full flex flex-col hover:border-[#CC785C]/20 transition-all duration-300">
        {/* Pill-Shaped Category Tag */}
        <span className="inline-block bg-[#CC785C]/10 text-[#CC785C] text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-mono mb-4 w-fit">
          {category}
        </span>

        {/* Title in Space Grotesk */}
        <h3 className="font-heading text-2xl text-white mt-2 mb-3 group-hover:text-[#CC785C] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-zinc-400 mb-6 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Aesthetic Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
              Completion
            </span>
            <span className="font-mono text-[10px] text-[#CC785C]">
              100%
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#CC785C] to-[#b8674a] rounded-full shadow-[0_0_8px_rgba(204,120,92,0.6)]"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {/* Pill-Shaped Action Button */}
        <button className="w-full py-3 px-6 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-semibold text-sm rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] group-hover:scale-[1.02]">
          View Resource
        </button>
      </OSCard>
    </Link>
  );
}
