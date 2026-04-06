"use client";

import { useState } from "react";
import ResourceCard from "@/components/ResourceCard";
import BottomCTA from "@/components/BottomCTA";
import { getAllResources, categories } from "@/data/resources";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const allResources = getAllResources();
  const filteredResources = allResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 w-full max-w-[100vw] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-4 uppercase">
            Heyykrish.AI // Resources
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Resource Hub
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl">
            Every prompt, workflow, and automation I actually use—documented and ready for you to deploy. Find your use case, download the guide, and start building.
          </p>
        </div>

        {/* Command-Line Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="> Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm bg-[#121212] border border-white/10 rounded-full font-mono text-[#CC785C] placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl"
          />
        </div>

        {/* Pill-Shaped Filter Toggle Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#CC785C] text-black shadow-[0_0_15px_rgba(204,120,92,0.4)] font-semibold"
                  : "bg-white/5 text-zinc-400 border border-white/5 hover:bg-white/10 hover:text-zinc-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid with OSCard */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="font-mono text-xs tracking-widest text-zinc-600 mb-2 uppercase">
              No Results Found
            </div>
            <p className="text-zinc-500 font-mono text-sm">
              &gt; No records match your query. Try adjusting filters.
            </p>
          </div>
        )}

        {/* Results Counter */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="font-mono text-xs text-zinc-600 uppercase tracking-wider">
            {filteredResources.length} {filteredResources.length === 1 ? 'Record' : 'Records'} Found
          </p>
        </div>

        {/* Bottom Newsletter CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-24">
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
