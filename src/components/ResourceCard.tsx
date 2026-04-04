import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ResourceCardProps {
  id: string;
  slug?: string;
  title: string;
  description: string;
  category: string;
  link?: string;
}

const categoryColors: Record<string, string> = {
  Prompts: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Tools: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Learning: "bg-green-500/10 text-green-400 border-green-500/20",
  Marketing: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Automations: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  "Video Editing": "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ResourceCard({
  slug,
  title,
  description,
  category,
  link,
}: ResourceCardProps) {
  const colorClass = categoryColors[category] || "bg-zinc-700/50 text-zinc-400 border-zinc-600";
  const href = link || (slug ? `/resources/${slug}` : "#");

  return (
    <Link
      href={href}
      className="group block p-5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span
            className={`inline-block px-2.5 py-1 text-xs font-medium rounded-md mb-3 border ${colorClass}`}
          >
            {category}
          </span>
          <h3 className="font-semibold text-zinc-50 mb-1.5 group-hover:text-[#E17F62] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
        </div>
        <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-[#E17F62] flex-shrink-0 mt-1 transition-colors" />
      </div>
    </Link>
  );
}
