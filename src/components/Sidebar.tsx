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
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Resources", href: "/resources", icon: Folder },
  { name: "Brand Partnerships", href: "/brand-partnerships", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/heyykrish", icon: InstagramIcon },
  // { name: "TikTok", href: "https://tiktok.com/@heyykrish", icon: TikTokIcon },
  // { name: "YouTube", href: "https://youtube.com/@heyykrish", icon: YoutubeIcon },
  { name: "Email", href: "mailto:hello@heyykrish.ai", icon: Mail },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Profile Header */}
      <div className="p-6 pb-4">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center mb-3 overflow-hidden border border-zinc-700">
            <span className="text-2xl font-semibold text-[#E17F62]">K</span>
          </div>
          <h2 className="text-lg font-semibold text-zinc-50">Krish Chhatrala</h2>
          <p className="text-sm text-zinc-400 mt-0.5">AI Creator</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-zinc-800 text-zinc-50"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Find Me Section */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
            Find Me
          </h3>
          <ul className="space-y-1">
            {socialLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-50 transition-all duration-150"
                >
                  {link.icon === Mail ? (
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <link.icon />
                  )}
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Newsletter CTA */}
      <div className="p-4 mt-auto">
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4">
          <p className="text-sm font-medium text-zinc-50 mb-3">
            Join 10k+ getting my weekly AI breakdown
          </p>
          <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-50 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#E17F62] focus:border-transparent transition-all"
            />
            <button
              type="submit"
              className="w-full px-3 py-2 text-sm font-medium text-zinc-950 bg-[#E17F62] rounded-lg hover:bg-[#d4725a] transition-all duration-300 shadow-[0_0_12px_rgba(225,127,98,0.25)] hover:shadow-[0_0_18px_rgba(225,127,98,0.4)]"
            >
              Join Free
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 z-40">
        <span className="text-lg font-semibold text-zinc-50">heyykrish.ai</span>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-zinc-400" />
          ) : (
            <Menu className="w-6 h-6 text-zinc-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop fixed, Mobile slide-out */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-zinc-900 border-r border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out sidebar-scroll overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile content spacer */}
      <div className="lg:hidden h-16" />
    </>
  );
}
