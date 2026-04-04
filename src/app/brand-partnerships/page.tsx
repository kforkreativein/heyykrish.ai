"use client";

import { Download } from "lucide-react";
import BottomCTA from "@/components/BottomCTA";

const stats = [
  { label: "Followers", value: "150K+" },
  { label: "Monthly Impressions", value: "5M+" },
  { label: "Audience Age", value: "18-34" },
];

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
    <div className="min-h-screen bg-zinc-950 pt-8 lg:pt-16 pb-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-zinc-50 mb-3 tracking-tight">
            Work With Me
          </h1>
          <p className="text-lg text-zinc-400">
            Partner with heyykrish to reach a highly engaged audience of AI
            enthusiasts and creators.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center"
            >
              <p className="text-2xl lg:text-3xl font-bold text-[#E17F62] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Audience Info */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-50 mb-4">
            Audience Demographics
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Primary Platforms</p>
                <p className="font-medium text-zinc-50">
                  Instagram, TikTok, YouTube
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Top Interests</p>
                <p className="font-medium text-zinc-50">
                  AI Tools, Productivity, Content Creation
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Location</p>
                <p className="font-medium text-zinc-50">
                  US, UK, Canada, India
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Engagement Rate</p>
                <p className="font-medium text-zinc-50">8.5% average</p>
              </div>
            </div>
          </div>
        </div>

        {/* Past Partners */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-zinc-50 mb-4">
            Past Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pastPartners.map((partner) => (
              <div
                key={partner}
                className="h-20 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center"
              >
                <span className="text-sm font-medium text-zinc-500">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit Download */}
        <div className="mb-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800 border border-zinc-700 text-zinc-50 font-medium rounded-xl hover:bg-zinc-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(225,127,98,0.2)]"
          >
            <Download className="w-5 h-5" />
            Download Full Media Kit
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-zinc-50 mb-6">
            Get in Touch
          </h2>
          <form
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 text-sm bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Brand / Company
              </label>
              <input
                type="text"
                id="brand"
                placeholder="Your Company"
                className="w-full px-4 py-3 text-sm bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@company.com"
                className="w-full px-4 py-3 text-sm bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-300 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell me about your partnership idea..."
                className="w-full px-4 py-3 text-sm bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-[#E17F62] rounded-xl hover:bg-[#d4725a] transition-all duration-300 shadow-[0_0_20px_rgba(225,127,98,0.3)] hover:shadow-[0_0_30px_rgba(225,127,98,0.5)]"
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Bottom CTA */}
        <BottomCTA
          badge="Let's Partner"
          heading="Ready to collaborate?"
          subtext="I work with brands that align with my mission to democratize AI knowledge. Let's create something meaningful together."
          buttonText="Get in Touch"
          buttonHref="#contact"
        />
      </div>
    </div>
  );
}
