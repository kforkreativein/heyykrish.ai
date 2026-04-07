import OSCard from "@/components/OSCard";
import { mediaKitData } from "@/data/mediakit";

export default function MediaKitPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 relative overflow-hidden w-full max-w-[100vw] animate-page-enter">
      {/* Ambient Background Glow with float animation */}
      <div 
        className="absolute top-[-10%] left-[10%] md:left-[20%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#CC785C]/15 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 animate-fade-up">
          {/* Technical Breadcrumb */}
          <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-4 uppercase">
            Heyykrish.AI // Media Kit
          </div>
          
          {/* Main Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight mb-4">
            Krish Chhatrala
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-mono tracking-wider uppercase">
            AI Creator &amp; Automations Expert
          </p>
        </div>

        {/* Top Row - Big Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Followers */}
          <OSCard className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">
              Followers
            </div>
            <div className="font-heading text-[#CC785C] text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
              {mediaKitData.followers}
            </div>
          </OSCard>

          {/* Monthly Impressions */}
          <OSCard className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">
              Monthly Impressions
            </div>
            <div className="font-heading text-[#CC785C] text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
              {mediaKitData.impressions}
            </div>
          </OSCard>

          {/* Audience Age */}
          <OSCard className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-2">
              Audience Age
            </div>
            <div className="font-heading text-[#CC785C] text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
              {mediaKitData.audienceAge}
            </div>
          </OSCard>
        </div>

        {/* Second Row - Audience Details */}
        <OSCard className="animate-fade-up" style={{ animationDelay: "0.25s" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Top Locations */}
            <div>
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">
                Top Locations
              </div>
              <div className="space-y-2">
                {mediaKitData.demographics.topLocations.map((location, index) => (
                  <div key={location} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#CC785C] opacity-80" />
                    <span className="text-zinc-300 font-mono text-sm">{location}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement & Gender */}
            <div>
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">
                Engagement Rate
              </div>
              <div className="text-zinc-300 font-mono text-lg mb-6">
                {mediaKitData.engagementRate} average
              </div>
              
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">
                Gender Split
              </div>
              <div className="space-y-2">
                <div className="text-zinc-300 font-mono text-sm">
                  Male: {mediaKitData.demographics.gender.male}
                </div>
                <div className="text-zinc-300 font-mono text-sm">
                  Female: {mediaKitData.demographics.gender.female}
                </div>
              </div>
            </div>

            {/* Top Interests */}
            <div>
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">
                Top Interests
              </div>
              <div className="space-y-3">
                {mediaKitData.topInterests.map((interest) => (
                  <div key={interest} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#CC785C] opacity-80" />
                    <span className="text-zinc-300 font-mono text-sm">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="flex justify-end mt-8 pt-6 border-t border-white/5">
            <span className="font-mono text-xs text-zinc-600 tracking-wider">
              Last Updated: {mediaKitData.lastUpdated}
            </span>
          </div>
        </OSCard>
      </div>
    </div>
  );
}