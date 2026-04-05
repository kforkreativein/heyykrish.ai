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
    <div className="min-h-screen bg-[#0a0a0a] pt-8 lg:pt-16 pb-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#CC785C]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-4 uppercase">
            Heyykrish.AI // Partnership
          </div>
          <h1 className="font-heading text-5xl font-bold text-white mb-4 tracking-tight">
            Partner with Krish
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl">
            Put your tool in front of 150,000+ creators and founders who actually take action. I partner with brands to build authentic, workflow-driven content that drives conversions, not just vanity metrics.
          </p>
        </div>

        {/* Media Kit CTA */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/media-kit"
              className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] hover:scale-105"
            >
              <Download size={20} />
              View Media Kit
            </Link>
            <a 
              href="mailto:kforkreativein@gmail.com"
              className="px-8 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold transition-all flex items-center gap-2"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Past Partners */}
        <div className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-white mb-6">
            Past Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {pastPartners.map((partner) => (
              <OSCard
                key={partner}
                className="h-32 flex items-center justify-center group hover:border-[#CC785C]/20 transition-all duration-300"
              >
                <div className="text-center">
                  {/* Logo Placeholder */}
                  <div className="w-12 h-12 mx-auto mb-3 bg-[#CC785C]/10 rounded-full flex items-center justify-center group-hover:bg-[#CC785C]/20 transition-all duration-300">
                    <span className="text-[#CC785C] font-mono text-lg font-bold">
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
          <h2 className="font-heading text-2xl font-semibold text-white mb-6">
            What I Offer:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 - The Workflow */}
            <OSCard className="h-full">
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#CC785C] uppercase">
                  [ MODULE // BUILD ]
                </span>
              </div>
              <h3 className="font-heading text-2xl text-white mb-2">
                Custom AI Workflows
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We don't do generic tool reviews. I spend hundreds of hours recreating successful creator videos, building custom AI prompts, and designing full-scale automations from scratch. Every tool and resource is built with specificity to solve real-world technical problems.
              </p>
            </OSCard>

            {/* Card 2 - The User Value */}
            <OSCard className="h-full">
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#CC785C] uppercase">
                  [ VALUE // DEPLOY ]
                </span>
              </div>
              <h3 className="font-heading text-2xl text-white mb-2">
                Immediate Action & Trust
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This deep-dive technical content is given away for free. Users get immediate, tangible value by plugging my resources directly into their businesses. This drives incredible engagement and skyrockets brand perception and trust.
              </p>
            </OSCard>

            {/* Card 3 - The Partner Benefit */}
            <OSCard className="h-full">
              <div className="mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#CC785C] uppercase">
                  [ RESULT // ACQUIRE ]
                </span>
              </div>
              <h3 className="font-heading text-2xl text-white mb-2">
                High-Intent User Growth
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                For you, this means extremely high-trust partnerships. Users don't just watch; they download, they implement, and they convert. Leverage my high-engagement platform to acquire quality users and customers who value execution over hype.
              </p>
            </OSCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <BottomCTA
          badge="Let's Partner"
          heading="Ready to collaborate?"
          subtext="I work with brands that align with my mission to democratize AI knowledge. Let's create something meaningful together."
          buttonText="Get in Touch"
          buttonHref="mailto:kforkreativein@gmail.com"
        />

      </div>
    </div>
  );
}
