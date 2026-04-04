import Link from "next/link";

interface BottomCTAProps {
  badge?: string;
  heading: string;
  subtext: string;
  buttonText: string;
  buttonHref: string;
}

export default function BottomCTA({
  badge = "Let's Connect",
  heading,
  subtext,
  buttonText,
  buttonHref,
}: BottomCTAProps) {
  return (
    <div className="relative mt-16 lg:mt-24 bg-[#1c1c21] rounded-2xl p-8 md:p-12 border border-zinc-800 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E17F62]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          {/* Badge */}
          <div className="inline-block mb-4">
            <span className="px-3 py-1 text-xs font-semibold text-[#E17F62] bg-[#E17F62]/10 border border-[#E17F62]/20 rounded-full">
              {badge}
            </span>
          </div>
          
          {/* Heading */}
          <h2 className="text-2xl lg:text-3xl font-bold text-zinc-50 mb-3">
            {heading}
          </h2>
          
          {/* Subtext */}
          <p className="text-zinc-400 leading-relaxed max-w-2xl">
            {subtext}
          </p>
        </div>
        
        {/* CTA Button */}
        <div className="md:flex-shrink-0">
          <Link
            href={buttonHref}
            className="inline-block px-8 py-4 text-sm font-semibold text-zinc-950 bg-[#E17F62] rounded-xl hover:bg-[#d4725a] transition-all duration-300 shadow-[0_0_20px_rgba(225,127,98,0.3)] hover:shadow-[0_0_30px_rgba(225,127,98,0.5)] whitespace-nowrap"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
