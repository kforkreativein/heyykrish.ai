"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";
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
    <div className="min-h-screen bg-zinc-950 pt-8 lg:pt-16 pb-16 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-zinc-50 mb-3 tracking-tight">
            Resource Hub
          </h1>
          <p className="text-lg text-zinc-400">
            All my prompts, tools, and guides in one place.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                activeCategory === category
                  ? "bg-[#E17F62] text-zinc-950 border-[#E17F62]"
                  : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500">No resources found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
