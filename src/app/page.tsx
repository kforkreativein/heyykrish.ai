"use client";

import { useState } from "react";
import Link from "next/link";
import ResourceCard from "@/components/ResourceCard";
import TypewriterText from "@/components/TypewriterText";
import { getFeaturedResources } from "@/data/resources";

export default function Home() {
  const featuredResources = getFeaturedResources();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "homepage",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting newsletter:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-8 lg:pt-16 pb-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-[#CC785C]/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 md:w-[60%]">
              {/* Technical Breadcrumb */}
              <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-4 uppercase">
                Heyykrish.AI // Home
              </div>

              {/* H1 - Stop Learning, Start Deploying */}
              <h1 className="font-heading text-6xl md:text-7xl font-bold tracking-tight text-white mb-6">
                Stop Learning AI. Start Deploying It.
              </h1>
              
              {/* H2 - Clean Inline Typewriter */}
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-200 mb-6 flex flex-wrap items-center gap-x-3">
                <span>Steal my private</span>
                <span className="text-[#CC785C]">
                  <TypewriterText
                    words={["workflows.", "prompts.", "automations."]}
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
                  Join 10,000+ beginners learning AI weekly. Get tools, prompts, and workflows delivered to your inbox every Tuesday.
                </p>
                <form
                  className="flex flex-col sm:flex-row gap-3"
                  onSubmit={handleNewsletterSubmit}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 text-sm bg-[#0a0a0a] border border-white/10 rounded-full text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#CC785C] focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || submitted}
                    className="px-6 py-3 text-sm font-semibold text-black bg-gradient-to-b from-[#CC785C] to-[#b8674a] rounded-full hover:shadow-[0_0_25px_rgba(204,120,92,0.5)] transition-all duration-300 shadow-[0_0_15px_rgba(204,120,92,0.3)] whitespace-nowrap disabled:opacity-50"
                  >
                    {submitted ? "✓ Subscribed!" : isSubmitting ? "Joining..." : "Join Free"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Profile Image */}
            <div className="md:w-[40%] flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CC785C] to-[#b8674a] rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative w-80 h-96 rounded-[32px] border border-white/5 bg-[#121212] overflow-hidden transform -rotate-2 hover:rotate-0 transition-all duration-500 shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5)]">
                  {/* Placeholder for profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-[#121212] to-[#0a0a0a] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#CC785C] to-[#b8674a] flex items-center justify-center shadow-[0_0_20px_rgba(204,120,92,0.4)]">
                        <span className="text-5xl font-bold text-black">K</span>
                      </div>
                      <p className="text-zinc-400 text-sm">Add your photo here</p>
                      <p className="text-zinc-600 text-xs mt-1 font-mono">
                        /public/profile.jpg
                      </p>
                    </div>
                  </div>
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
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white">
                Active Modules
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
    </div>
  );
}
