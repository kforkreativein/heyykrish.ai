import OSCard from "./OSCard";

export default function ResourceSkeleton() {
  return (
    <OSCard className="relative overflow-hidden">
      <div className="animate-pulse">
        {/* Category skeleton */}
        <div className="h-5 w-24 bg-white/5 rounded-full mb-4" />
        
        {/* Title skeleton */}
        <div className="h-7 w-3/4 bg-white/5 rounded-lg mb-3" />
        
        {/* Description skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-5/6 bg-white/5 rounded" />
          <div className="h-4 w-2/3 bg-white/5 rounded" />
        </div>
        
        {/* Progress bar skeleton */}
        <div className="h-1 w-full bg-white/5 rounded-full mb-6" />
        
        {/* Button skeleton */}
        <div className="h-10 w-full bg-white/5 rounded-full" />
      </div>
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </OSCard>
  );
}
