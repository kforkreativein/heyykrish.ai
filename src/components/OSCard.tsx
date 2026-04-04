import { ReactNode } from "react";

interface OSCardProps {
  children: ReactNode;
  className?: string;
}

export default function OSCard({ children, className = "" }: OSCardProps) {
  return (
    <div
      className={`bg-[#121212] border border-white/5 rounded-[32px] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] p-6 md:p-8 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}
