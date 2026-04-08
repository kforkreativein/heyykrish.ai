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
import NewsletterModal from "./NewsletterModal";

const InstagramIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resources", href: "/resources", icon: Folder },
  { name: "About", href: "/about", icon: User },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/heyykrish.ai", icon: InstagramIcon },
  { name: "Email", href: "mailto:kforkreativein@gmail.com", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-2">
      {/* Profile Header */}
      <div className="p-5 pb-6">
        <div className="flex flex-col items-center text-center">
          {/* Status indicator */}
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#FF6A25] uppercase mb-2">
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
        <ul className="flex flex-col gap-6" role="list">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-mono text-[11px] uppercase tracking-[0.15em] transition-all duration-200 focus-ring group ${
                    isActive
                      ? "text-[#FF6A25]"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {/* Active dot indicator with trail effect */}
                  <span 
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive 
                        ? "bg-[#FF6A25] nav-dot-active shadow-[0_0_8px_rgba(255,106,37,0.6)]" 
                        : "bg-zinc-700 group-hover:bg-zinc-500 group-hover:scale-110"
                    }`} 
                    aria-hidden="true"
                  />
                  <span className={`transition-transform duration-200 ${isActive ? "" : "group-hover:translate-x-0.5"}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Connect Section */}
        <div className="mt-12 mb-8">
          <h3 className="px-4 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em] mb-4">
            Connect
          </h3>
          <div className="flex flex-col gap-3 px-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.name}${link.href.startsWith('mailto:') ? '' : ' (opens in new tab)'}`}
                className="flex items-center gap-4 px-5 py-3.5 w-full rounded-[16px] border border-white/5 bg-[#121212] hover:bg-white/5 transition-all text-sm font-mono text-zinc-300 tracking-wide shadow-sm focus-ring"
              >
                <span className="text-zinc-500 group-hover:text-[#FF6A25] transition-colors" aria-hidden="true">
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
            Join the Weekly Breakdown
          </p>
          <button
            onClick={() => setIsNewsletterModalOpen(true)}
            className="w-full px-4 py-2.5 sm:py-3 text-xs font-mono font-medium text-black bg-[#FF6A25] rounded-full hover:bg-[#FF6A25] transition-all duration-200 uppercase tracking-wider btn-press focus-ring"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-4 z-40">
        <Link href="/" className="font-heading text-base font-semibold text-white hover:text-[#FF6A25] transition-colors">
          heyykrish.ai
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-sidebar"
          className="p-2 rounded-xl bg-[#121212] border border-white/5 hover:bg-white/5 transition-colors focus-ring"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-zinc-400" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5 text-zinc-400" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Desktop floating panel, Mobile slide-out */}
      <aside
        id="mobile-sidebar"
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 h-full lg:h-auto lg:top-4 lg:bottom-4 lg:left-4 w-[280px] lg:w-[260px] bg-[#121212] border border-white/5 lg:rounded-[32px] shadow-[0_4px_24px_-1px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] z-50 transform transition-transform duration-300 ease-in-out sidebar-scroll overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile content spacer */}
      <div className="lg:hidden h-14" aria-hidden="true" />

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isNewsletterModalOpen}
        onClose={() => setIsNewsletterModalOpen(false)}
      />
    </>
  );
}
