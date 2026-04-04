"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Folder,
  Briefcase,
  User,
  Mail,
  Menu,
  X,
} from "lucide-react";

const InstagramIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resources", href: "/resources", icon: Folder },
  { name: "Partnerships", href: "/brand-partnerships", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/heyykrish", icon: InstagramIcon },
  { name: "Email", href: "mailto:hello@heyykrish.ai", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarEmail, setSidebarEmail] = useState("");
  const [isSidebarSubmitting, setIsSidebarSubmitting] = useState(false);
  const [sidebarSubmitted, setSidebarSubmitted] = useState(false);

  const handleSidebarNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSidebarSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: sidebarEmail,
          source: "sidebar",
        }),
      });

      if (response.ok) {
        setSidebarSubmitted(true);
        setSidebarEmail("");
        setTimeout(() => setSidebarSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting newsletter:", error);
    } finally {
      setIsSidebarSubmitting(false);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-2">
      {/* Profile Header */}
      <div className="p-5 pb-6">
        <div className="flex flex-col items-center text-center">
          {/* Status indicator */}
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#CC785C] uppercase mb-2">
            System Ready
          </span>
          {/* Name */}
          <h2 className="font-heading text-xl text-white font-semibold tracking-tight">
            Krish Chhatrala
          </h2>
          <p className="font-mono text-[10px] tracking-[0.15em] text-zinc-500 uppercase mt-1">
            AI Creator
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-200 ${
                    isActive
                      ? "text-[#CC785C]"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {/* Active dot indicator */}
                  <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    isActive 
                      ? "bg-[#CC785C] shadow-[0_0_8px_rgba(204,120,92,0.6)]" 
                      : "bg-zinc-700"
                  }`} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Connect Section */}
        <div className="mt-10 mb-6">
          <h3 className="px-4 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em] mb-4">
            Connect
          </h3>
          <div className="space-y-2 px-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-full bg-white/5 hover:bg-[#CC785C]/10 border border-white/5 hover:border-[#CC785C]/20 text-sm text-zinc-400 hover:text-zinc-200 transition-all duration-200 group"
              >
                <span className="text-zinc-500 group-hover:text-[#CC785C] transition-colors">
                  <link.icon />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  {link.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Newsletter CTA */}
      <div className="p-3 mt-auto">
        <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4">
          <p className="font-mono text-[10px] tracking-[0.1em] text-zinc-400 uppercase mb-3">
            Weekly AI Breakdown
          </p>
          <form className="space-y-2" onSubmit={handleSidebarNewsletter}>
            <input
              type="email"
              value={sidebarEmail}
              onChange={(e) => setSidebarEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 text-xs font-mono bg-[#121212] border border-white/5 rounded-full text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#CC785C]/50 focus:border-[#CC785C]/50 transition-all"
            />
            <button
              type="submit"
              disabled={isSidebarSubmitting || sidebarSubmitted}
              className="w-full px-4 py-2.5 text-xs font-mono font-medium text-black bg-[#CC785C] rounded-full hover:bg-[#B86246] transition-all duration-200 uppercase tracking-wider disabled:opacity-50"
            >
              {sidebarSubmitted ? "✓ Subscribed!" : isSidebarSubmitting ? "Joining..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-4 z-40">
        <span className="font-heading text-base font-semibold text-white">heyykrish.ai</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-[#121212] border border-white/5 hover:bg-white/5 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-zinc-400" />
          ) : (
            <Menu className="w-5 h-5 text-zinc-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop floating panel, Mobile slide-out */}
      <aside
        className={`fixed top-0 left-0 h-full lg:h-auto lg:top-4 lg:bottom-4 lg:left-4 w-[280px] lg:w-[260px] bg-[#121212] border border-white/5 lg:rounded-[32px] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] z-50 transform transition-transform duration-300 ease-in-out sidebar-scroll overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile content spacer */}
      <div className="lg:hidden h-14" />
    </>
  );
}
