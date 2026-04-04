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
            Partner With HeyyKrish
          </h1>
          <p className="text-lg text-zinc-400 max-w-3xl">
            Put your tool in front of 150,000+ creators and founders who actually take action. I partner with brands to build authentic, workflow-driven content that drives conversions, not just vanity metrics.
          </p>
        </div>

        {/* Media Kit CTA */}
        <div className="mb-12">
          <Link 
            href="/media-kit"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-bold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] hover:scale-105"
          >
            <Download size={20} />
            View Media Kit
          </Link>
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


        {/* Contact Form */}
        <OSCard>
          <h2 className="font-heading text-2xl font-semibold text-white mb-6">
            Get in Touch
          </h2>
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
              >
                Brand / Company
              </label>
              <input
                type="text"
                id="brand"
                placeholder="Your Company"
                className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@company.com"
                className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-mono text-xs font-medium text-zinc-400 mb-2 uppercase tracking-wider"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about your product and partnership goals..."
                className="w-full px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-[24px] text-zinc-50 placeholder:text-zinc-600 focus:outline-none focus:border-[#CC785C] focus:shadow-[0_0_20px_rgba(204,120,92,0.2)] transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 text-base font-bold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50 active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </OSCard>
        
        {/* Bottom CTA */}
        <BottomCTA
          badge="Let's Partner"
          heading="Ready to collaborate?"
          subtext="I work with brands that align with my mission to democratize AI knowledge. Let's create something meaningful together."
          buttonText="Get in Touch"
          buttonHref="#contact"
          useContactModal={true}
        />
      </div>
    </div>
  );
}
