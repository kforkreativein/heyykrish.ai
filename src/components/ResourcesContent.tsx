"use client";

import { useState, useEffect, useCallback } from "react";
import ResourceCard from "@/components/ResourceCard";
import BottomCTA from "@/components/BottomCTA";
import { getAllResources, categories } from "@/data/resources";
import ResourceSkeleton from "@/components/ResourceSkeleton";

export default function ResourcesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const allResources = getAllResources();
  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Cmd+K keyboard shortcut
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      const input = document.getElementById("resource-search") as HTMLInputElement;
      input?.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 w-full max-w-[100vw] overflow-hidden animate-page-enter">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 animate-fade-up">
          <div className="font-mono text-xs tracking-widest text-[#FF6A25] mb-4 uppercase">
            Heyykrish.AI // Resources
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Resource Hub
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl">
            Every prompt, workflow, and automation I actually use—documented and ready for you to deploy. Find your use case, download the guide, and start building.
          </p>
        </div>

        {/* Command-Line Search Bar with Cmd+K hint */}
        <div className="relative mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <label htmlFor="resource-search" className="sr-only">Search resources</label>
          <input
            id="resource-search"
            type="text"
            placeholder="> Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-describedby="search-results-count"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm bg-[#121212] border border-white/10 rounded-full font-mono text-[#FF6A25] placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6A25] focus:shadow-[0_0_20px_rgba(255,106,37,0.2)] transition-all shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl pr-20"
          />
          <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono text-zinc-500 bg-white/5 rounded border border-white/10">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        {/* Pill-Shaped Filter Toggle Buttons */}
        <div 
          className="flex flex-wrap gap-2 sm:gap-3 mb-10 animate-fade-up" 
          role="group" 
          aria-label="Filter by category"
          style={{ animationDelay: "0.15s" }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 btn-press focus-ring ${
                activeCategory === category
                  ? "bg-[#FF6A25] text-black shadow-[0_0_15px_rgba(255,106,37,0.4)] font-semibold"
                  : "bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10 hover:text-zinc-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid with OSCard */}
        <div aria-live="polite" aria-atomic="true">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <ResourceSkeleton key={i} />
              ))}
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredResources.map((resource, index) => (
                <div 
                  key={resource.id} 
                  className="animate-fade-up"
                  style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                >
                  <ResourceCard {...resource} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16" role="status">
              <div className="font-mono text-xs tracking-widest text-zinc-600 mb-2 uppercase">
                No Results Found
              </div>
              <p className="text-zinc-500 font-mono text-sm">
                &gt; No records match your query. Try adjusting filters.
              </p>
            </div>
          )}
        </div>

        {/* Results Counter - Live region for screen readers */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p 
            id="search-results-count"
            role="status" 
            aria-live="polite" 
            className="font-mono text-xs text-zinc-600 uppercase tracking-wider"
          >
            {filteredResources.length} {filteredResources.length === 1 ? 'Record' : 'Records'} Found
          </p>
        </div>

        {/* Bottom Newsletter CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-24 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <BottomCTA
            badge="Stay Updated"
            heading="Never miss the latest AI tools"
            subtext="Join creators getting my weekly AI breakdown. Real tools, real workflows, zero fluff delivered every Tuesday."
            buttonText="Join the Newsletter"
            buttonHref="/#newsletter"
            useModal={true}
          />
        </div>
      </div>
    </div>
  );
}
