"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import BottomCTA from "@/components/BottomCTA";
import OSCard from "@/components/OSCard";

const pastPartners = [
  "AI Tool Co",
  "CreatorStack", 
  "AutomatePro",
  "ContentAI",
  "EditMagic",
  "PromptLab",
];

export default function BrandPartnershipsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 relative overflow-hidden w-full max-w-[100vw] animate-page-enter">
      {/* Ambient Background Glow with float animation */}
      <div 
        className="absolute top-[-10%] left-[10%] md:left-[20%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#FF6A25]/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12 animate-fade-up">
          <div className="font-mono text-xs tracking-widest text-[#FF6A25] mb-4 uppercase">
            Heyykrish.AI // Partnership
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Partner with Krish
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl">
            Put your tool in front of 150,000+ creators and founders who actually take action. I partner with brands to build authentic, workflow-driven content that drives conversions, not just vanity metrics.
          </p>
        </div>

        {/* Media Kit CTA */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <Link 
              href="/media-kit"
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-black bg-gradient-to-b from-[#FF6A25] to-[#FF6A25] rounded-full hover:shadow-[0_0_20px_rgba(255,106,37,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(255,106,37,0.3)] hover:scale-105 btn-magnetic"
            >
              <Download size={18} />
              View Media Kit
            </Link>
            <a 
              href="mailto:kforkreativein@gmail.com"
              className="px-6 sm:px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Past Partners */}
        <div className="mb-12 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-6">
            Past Partners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pastPartners.map((partner, index) => (
              <OSCard
                key={partner}
                className="h-32 flex items-center justify-center group hover:border-[#FF6A25]/20 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
              >
                <div className="text-center">
                  {/* Logo Placeholder */}
                  <div className="w-12 h-12 mx-auto mb-3 bg-[#FF6A25]/10 rounded-full flex items-center justify-center group-hover:bg-[#FF6A25]/20 transition-all duration-300">
                    <span className="text-[#FF6A25] font-mono text-lg font-bold">
                      {partner.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {partner}
                  </span>
                </div>
              </OSCard>
            ))}
          </div>
        </div>

        {/* What I Offer Section */}
        <div className="mb-12">
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-white mb-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            What I Offer:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 - The Workflow */}
            <OSCard className="h-full animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF6A25] uppercase">
                  [ MODULE // BUILD ]
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">
                Custom AI Workflows
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We don't do generic tool reviews. I spend hundreds of hours recreating successful creator videos, building custom AI prompts, and designing full-scale automations from scratch. Every tool and resource is built with specificity to solve real-world technical problems.
              </p>
            </OSCard>

            {/* Card 2 - The User Value */}
            <OSCard className="h-full animate-fade-up" style={{ animationDelay: "0.5s" }}>
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF6A25] uppercase">
                  [ VALUE // DEPLOY ]
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">
                Immediate Action & Trust
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This deep-dive technical content is given away for free. Users get immediate, tangible value by plugging my resources directly into their businesses. This drives incredible engagement and skyrockets brand perception and trust.
              </p>
            </OSCard>

            {/* Card 3 - The Partner Benefit */}
            <OSCard className="h-full animate-fade-up" style={{ animationDelay: "0.55s" }}>
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF6A25] uppercase">
                  [ RESULT // ACQUIRE ]
                </span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl text-white mb-2">
                High-Intent User Growth
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                For you, this means extremely high-trust partnerships. Users don't just watch; they download, they implement, and they convert. Leverage my high-engagement platform to acquire quality users and customers who value execution over hype.
              </p>
            </OSCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-24 animate-fade-up" style={{ animationDelay: "0.6s" }}>
          <BottomCTA
            badge="Let's Partner"
            heading="Ready to collaborate?"
            subtext="I work with brands that align with my mission to democratize AI knowledge. Let's create something meaningful together."
            buttonText="Get in Touch"
            buttonHref="mailto:kforkreativein@gmail.com"
            useContactModal={true}
          />
        </div>

      </div>
    </div>
  );
}
