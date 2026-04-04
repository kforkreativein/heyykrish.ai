"use client";

import Link from "next/link";
import ResourceCard from "@/components/ResourceCard";
import TypewriterText from "@/components/TypewriterText";
import { getFeaturedResources } from "@/data/resources";

export default function Home() {
  const featuredResources = getFeaturedResources();

  return (
    <div className="min-h-screen bg-zinc-950 pt-8 lg:pt-16 pb-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 md:w-[60%]">
              {/* H1 - The Greeting */}
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                Hey, I&apos;m <span className="text-[#E17F62]">Krish.</span>
              </h1>
              
              {/* H2 - The Offer with Typewriter */}
              <h2 className="text-3xl lg:text-4xl font-semibold text-zinc-200 mb-6 leading-snug">
                <span className="block">I&apos;m giving away all my</span>
                <span className="block text-orange-500">
                  <TypewriterText
                    words={["workflows.", "prompts.", "tools.", "automations."]}
                  />
                </span>
                <span className="block mt-2">Every single one. For free.</span>
              </h2>
              
              {/* Subtext - The Details */}
              <p className="text-base lg:text-lg text-zinc-400 max-w-2xl mb-8 leading-relaxed">
                I spend hours testing AI tools so you don&apos;t have to. <strong className="text-[#E17F62] font-semibold">The stuff that actually works</strong> is right here. Completely free.
              </p>

              {/* Newsletter Signup */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="font-semibold text-zinc-50 mb-1.5">
                  Get the weekly AI breakdown
                </h3>
                <p className="text-sm text-zinc-400 mb-4">
                  Join 10k+ creators getting my best finds every Tuesday.
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 text-sm bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-semibold text-zinc-950 bg-[#E17F62] rounded-xl hover:bg-[#d4725a] transition-all duration-300 shadow-[0_0_15px_rgba(225,127,98,0.3)] hover:shadow-[0_0_25px_rgba(225,127,98,0.5)] whitespace-nowrap"
                  >
                    Join Free
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="md:w-[40%] flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E17F62] to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative w-80 h-96 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden transform -rotate-2 hover:rotate-0 transition-all duration-500">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#E17F62] to-orange-600 flex items-center justify-center">
                        <span className="text-5xl font-bold text-zinc-950">K</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Add your photo here</p>
                      <p className="text-zinc-600 text-xs mt-1">
                        /public/profile.jpg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Resources Section */}
        <section className="pt-16 border-t border-zinc-800/50">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-zinc-50">
              Latest Resources
            </h2>
            <Link
              href="/resources"
              className="text-sm font-medium text-[#E17F62] hover:text-[#d4725a] transition-colors flex items-center gap-1.5 group"
            >
              See All
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
    </div>
  );
}
