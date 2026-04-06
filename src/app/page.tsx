"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ResourceCard from "@/components/ResourceCard";
import TypewriterText from "@/components/TypewriterText";
import NewsletterModal from "@/components/NewsletterModal";
import { getFeaturedResources } from "@/data/resources";

export default function Home() {
  const featuredResources = getFeaturedResources();
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 relative overflow-hidden w-full max-w-[100vw]">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[10%] md:left-[20%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#CC785C]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 md:w-[60%]">
              {/* Technical Breadcrumb */}
              <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-4 uppercase">
                Heyykrish.AI // Home
              </div>

              {/* H1 - Stop Learning, Start Deploying */}
              <h1 className="font-heading font-bold tracking-tight text-white mb-6 text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.1]">
                Stop Learning AI.<br />Start Deploying It.
              </h1>
              
              {/* H2 - Clean Inline Typewriter */}
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-200 mb-6 flex flex-wrap items-center gap-x-2 sm:gap-x-3">
                <span>Steal my private</span>
                <span className="text-[#CC785C]">
                  <TypewriterText
                    words={["workflows.", "prompts.", "automations.", "systems.", "templates."]}
                  />
                </span>
              </h2>
              
              {/* Subtext - Agency Scaling Story */}
              <p className="text-base lg:text-lg text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                I spend hundreds of hours breaking, testing, and building AI systems so you don't have to. Here is the exact, fluff-free playbook I use to scale my agency and content. Yours for free.
              </p>

              {/* Newsletter Signup */}
              <div className="bg-[#121212] border border-white/5 rounded-[32px] p-6 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl">
                <h3 className="font-semibold text-zinc-50 mb-1.5">
                  AI tips that actually help (no fluff)
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Join creators and founders learning AI weekly. Get tools, prompts, and workflows delivered to your inbox every Tuesday.
                </p>
                <button
                   onClick={() => setIsNewsletterModalOpen(true)}
                   className="w-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)]"
                 >
                   Join Free
                 </button>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="md:w-[40%] flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CC785C] to-[#b8674a] rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 rounded-[32px] border border-white/5 bg-[#121212] overflow-hidden transform -rotate-2 hover:rotate-0 transition-all duration-500 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5)]">
                  {/* Profile Image */}
                  <Image
                    src="/profile.jpg"
                    alt="Krish Chhatrala"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Resources Section - Dashboard Layout */}
        <section className="pt-16 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-2 uppercase">
                Latest Resources
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Featured Resources
              </h2>
            </div>
            <Link
              href="/resources"
              className="font-mono text-xs font-medium text-[#CC785C] hover:text-[#d88567] transition-colors flex items-center gap-1.5 group uppercase tracking-wider"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} />
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </div>
  );
}
