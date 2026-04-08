"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ResourceCard from "@/components/ResourceCard";
import TypewriterText from "@/components/TypewriterText";
import NewsletterModal from "@/components/NewsletterModal";
import { getFeaturedResources } from "@/data/resources";

export default function HomeContent() {
  const featuredResources = getFeaturedResources();
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 relative overflow-hidden w-full max-w-[100vw] animate-page-enter">
      {/* Ambient Background Glow - with floating animation */}
      <div 
        className="absolute top-[-10%] left-[10%] md:left-[20%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#FF6A25]/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"
        aria-hidden="true"
      />
      {/* Secondary glow for depth */}
      <div 
        className="absolute top-[20%] right-[5%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#FF6A25]/5 rounded-full blur-[100px] -z-10 pointer-events-none animate-float"
        style={{ animationDelay: "-10s", animationDirection: "reverse" }}
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 md:w-[60%]">
              {/* Technical Breadcrumb */}
              <div 
                className="font-mono text-xs tracking-widest text-[#FF6A25] mb-4 uppercase animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                Heyykrish.AI // Home
              </div>

              {/* H1 - Stop Learning, Start Deploying */}
              <h1 
                className="font-heading font-bold tracking-tight text-white mb-6 text-[clamp(2.25rem,7vw,4.5rem)] leading-[1.1] animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                Stop Learning AI.<br />Start Deploying It.
              </h1>
              
              {/* H2 - Clean Inline Typewriter */}
              <h2 
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-zinc-200 mb-6 flex flex-wrap items-center gap-x-2 sm:gap-x-3 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <span>Steal my private</span>
                <span className="text-[#FF6A25]">
                  <TypewriterText
                    words={["workflows.", "prompts.", "automations.", "systems.", "templates."]}
                  />
                </span>
              </h2>
              
              {/* Subtext - Agency Scaling Story */}
              <p 
                className="text-base lg:text-lg text-zinc-400 max-w-2xl mb-8 leading-relaxed animate-fade-up"
                style={{ animationDelay: "0.4s" }}
              >
                I spend hundreds of hours breaking, testing, and building AI systems so you don't have to. Here is the exact, fluff-free playbook I use to scale my agency and content. Yours for free.
              </p>

              {/* Newsletter Signup */}
              <div 
                className="bg-[#121212] border border-white/5 rounded-[32px] p-6 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-xl animate-fade-up"
                style={{ animationDelay: "0.5s" }}
              >
                <h3 className="font-semibold text-zinc-50 mb-1.5">
                  AI tips that actually help (no fluff)
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Join creators and founders learning AI weekly. Get tools, prompts, and workflows delivered to your inbox every Tuesday.
                </p>
                <button
                   onClick={() => setIsNewsletterModalOpen(true)}
                   className="w-full px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-black bg-gradient-to-b from-[#FF6A25] to-[#FF6A25] rounded-full hover:shadow-[0_0_25px_rgba(255,106,37,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(255,106,37,0.3)] btn-press btn-magnetic cta-glow focus-ring"
                 >
                   Join Free
                 </button>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div 
              className="md:w-[40%] flex justify-center md:justify-end animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative group profile-depth">
                <div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6A25] to-[#FF6A25] rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-500"
                  aria-hidden="true"
                />
                <div className="relative w-56 h-72 sm:w-64 sm:h-80 md:w-80 md:h-96 rounded-[32px] border border-white/5 bg-[#121212] overflow-hidden transform -rotate-2 group-hover:rotate-0 transition-all duration-500 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5)] border-glow-hover">
                  {/* Profile Image */}
                  <Image
                    src="/profile.jpg"
                    alt="Krish Chhatrala - AI Creator and Automation Expert"
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
              <div className="font-mono text-xs tracking-widest text-[#FF6A25] mb-2 uppercase">
                Latest Resources
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Featured Resources
              </h2>
            </div>
            <Link
              href="/resources"
              className="font-mono text-xs font-medium text-[#FF6A25] hover:text-[#d88567] transition-colors flex items-center gap-1.5 group uppercase tracking-wider focus-ring rounded-md px-2 py-1"
            >
              View All
              <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredResources.map((resource, index) => (
              <div 
                key={resource.id}
                className="animate-fade-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <ResourceCard {...resource} />
              </div>
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
