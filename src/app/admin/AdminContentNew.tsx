"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Mail, 
  Download, 
  MessageSquare, 
  TrendingUp,
  RefreshCw,
  Shield,
  Eye,
  EyeOff,
  Settings,
  FileText,
  Image as ImageIcon,
  Share2,
  Search,
  Award,
  Briefcase,
  BarChart3,
  Save,
  Upload
} from "lucide-react";
import OSCard from "@/components/OSCard";

interface Stats {
  newsletterCount: number;
  contactCount: number;
  downloadCount: number;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    typewriterWords: string[];
  };
  about: {
    title: string;
    bio: string;
    mission: string;
    stats: {
      followers: string;
      resources: string;
      impressions: string;
    };
  };
  social: {
    instagram: string;
    email: string;
    website: string;
  };
  seo: {
    homepage: { title: string; description: string; keywords: string };
    about: { title: string; description: string; keywords: string };
    resources: { title: string; description: string; keywords: string };
    partnerships: { title: string; description: string; keywords: string };
  };
  partnerships: {
    heading: string;
    subheading: string;
    pastPartners: Array<{ name: string; logo: string; url: string }>;
  };
  socialProof: {
    enabled: boolean;
    heading: string;
    logos: Array<{ name: string; image: string; url: string }>;
  };
}

type TabType = "overview" | "subscribers" | "contacts" | "hero" | "about" | "social" | "seo" | "partnerships" | "media-kit";

export default function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [stats, setStats] = useState<Stats>({ newsletterCount: 0, contactCount: 0, downloadCount: 0 });
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [mediaKitData, setMediaKitData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (result.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_auth", "true");
      } else {
        setError("Invalid password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
    setIsLoading(false);
  };

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/subscribers");
      if (response.ok) {
        const data = await response.json();
        setSubscribers(data);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    }
    setIsLoading(false);
  };

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
    setIsLoading(false);
  };

  const fetchSiteContent = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/content");
      if (response.ok) {
        const data = await response.json();
        setSiteContent(data);
      }
    } catch (error) {
      console.error("Failed to fetch site content:", error);
    }
    setIsLoading(false);
  };

  const fetchMediaKit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/mediakit");
      if (response.ok) {
        const data = await response.json();
        setMediaKitData(data);
      }
    } catch (error) {
      console.error("Failed to fetch media kit:", error);
    }
    setIsLoading(false);
  };

  const saveSiteContent = async () => {
    if (!siteContent) return;
    
    setIsLoading(true);
    setSaveMessage("");
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteContent),
      });
      
      if (response.ok) {
        setSaveMessage("✅ Content saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("❌ Failed to save content");
      }
    } catch (error) {
      console.error("Failed to save content:", error);
      setSaveMessage("❌ Error saving content");
    }
    setIsLoading(false);
  };

  const saveMediaKit = async () => {
    if (!mediaKitData) return;
    
    setIsLoading(true);
    setSaveMessage("");
    try {
      const response = await fetch("/api/admin/mediakit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mediaKitData),
      });
      
      if (response.ok) {
        setSaveMessage("✅ Media kit saved successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      } else {
        setSaveMessage("❌ Failed to save media kit");
      }
    } catch (error) {
      console.error("Failed to save media kit:", error);
      setSaveMessage("❌ Error saving media kit");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchSiteContent();
      fetchMediaKit();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (activeTab === "subscribers") {
      fetchSubscribers();
    } else if (activeTab === "contacts") {
      fetchContacts();
    }
  }, [activeTab]);

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => headers.map(header => `"${row[header] || ""}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4">
        <OSCard className="w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-[#CC785C]" />
          </div>
          
          <h1 className="font-heading text-2xl text-white text-center mb-2">
            Admin Access
          </h1>
          <p className="text-zinc-400 text-center mb-6 text-sm">
            Enter password to access dashboard
          </p>

          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-full text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Login"}
            </button>
          </form>
        </OSCard>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "subscribers", label: "Subscribers", icon: Mail },
    { id: "contacts", label: "Contacts", icon: MessageSquare },
    { id: "hero", label: "Hero Section", icon: ImageIcon },
    { id: "about", label: "About Page", icon: Users },
    { id: "social", label: "Social Links", icon: Share2 },
    { id: "seo", label: "SEO Settings", icon: Search },
    { id: "partnerships", label: "Partnerships", icon: Briefcase },
    { id: "media-kit", label: "Media Kit", icon: Award },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="font-mono text-xs tracking-widest text-[#CC785C] mb-4 uppercase">
            Admin // Dashboard
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
            Content Management System
          </h1>
          <p className="text-zinc-400">
            Manage your site content, subscribers, and analytics
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[#CC785C] text-black font-bold"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-300"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-[#121212] border border-white/10 rounded-2xl">
            <p className="text-center font-mono text-sm text-white">{saveMessage}</p>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <OSCard>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-zinc-500 uppercase mb-2">
                      Newsletter Subscribers
                    </div>
                    <div className="font-heading text-4xl text-[#CC785C] font-bold">
                      {stats.newsletterCount}
                    </div>
                  </div>
                  <div className="p-3 bg-[#CC785C]/10 rounded-full">
                    <Mail className="w-6 h-6 text-[#CC785C]" />
                  </div>
                </div>
              </OSCard>

              <OSCard>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-zinc-500 uppercase mb-2">
                      Contact Inquiries
                    </div>
                    <div className="font-heading text-4xl text-[#CC785C] font-bold">
                      {stats.contactCount}
                    </div>
                  </div>
                  <div className="p-3 bg-[#CC785C]/10 rounded-full">
                    <MessageSquare className="w-6 h-6 text-[#CC785C]" />
                  </div>
                </div>
              </OSCard>

              <OSCard>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs text-zinc-500 uppercase mb-2">
                      PDF Downloads
                    </div>
                    <div className="font-heading text-4xl text-[#CC785C] font-bold">
                      {stats.downloadCount}
                    </div>
                  </div>
                  <div className="p-3 bg-[#CC785C]/10 rounded-full">
                    <Download className="w-6 h-6 text-[#CC785C]" />
                  </div>
                </div>
              </OSCard>
            </div>

            {/* Quick Actions */}
            <OSCard>
              <h2 className="font-heading text-xl text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab("subscribers")}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group"
                >
                  <Mail className="w-5 h-5 text-[#CC785C] mb-2" />
                  <div className="font-mono text-sm text-white group-hover:text-[#CC785C]">
                    View Subscribers
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab("contacts")}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group"
                >
                  <MessageSquare className="w-5 h-5 text-[#CC785C] mb-2" />
                  <div className="font-mono text-sm text-white group-hover:text-[#CC785C]">
                    View Contacts
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab("hero")}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group"
                >
                  <ImageIcon className="w-5 h-5 text-[#CC785C] mb-2" />
                  <div className="font-mono text-sm text-white group-hover:text-[#CC785C]">
                    Edit Hero Section
                  </div>
                </button>
                
                <button
                  onClick={fetchStats}
                  disabled={isLoading}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-left transition-all group"
                >
                  <RefreshCw className={`w-5 h-5 text-[#CC785C] mb-2 ${isLoading ? "animate-spin" : ""}`} />
                  <div className="font-mono text-sm text-white group-hover:text-[#CC785C]">
                    Refresh Data
                  </div>
                </button>
              </div>
            </OSCard>
          </div>
        )}

        {activeTab === "subscribers" && (
          <OSCard>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-white">Newsletter Subscribers</h2>
              <button
                onClick={() => exportToCSV(subscribers, "subscribers.csv")}
                className="flex items-center gap-2 px-4 py-2 bg-[#CC785C] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-[#CC785C] animate-spin mx-auto mb-2" />
                <p className="text-zinc-400 font-mono text-sm">Loading subscribers...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-mono text-xs text-zinc-500 uppercase">Email</th>
                      <th className="text-left py-3 px-4 font-mono text-xs text-zinc-500 uppercase">Name</th>
                      <th className="text-left py-3 px-4 font-mono text-xs text-zinc-500 uppercase">Source</th>
                      <th className="text-left py-3 px-4 font-mono text-xs text-zinc-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4 text-zinc-300 font-mono text-sm">{sub.email}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{sub.name || "—"}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm capitalize">{sub.source}</td>
                        <td className="py-3 px-4 text-zinc-500 text-sm">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </OSCard>
        )}

        {activeTab === "contacts" && (
          <OSCard>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-white">Contact Inquiries</h2>
              <button
                onClick={() => exportToCSV(contacts, "contacts.csv")}
                className="flex items-center gap-2 px-4 py-2 bg-[#CC785C] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-[#CC785C] animate-spin mx-auto mb-2" />
                <p className="text-zinc-400 font-mono text-sm">Loading contacts...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{contact.name}</h3>
                        <p className="text-zinc-400 text-sm">{contact.email}</p>
                        {contact.company && (
                          <p className="text-zinc-500 text-sm font-mono">{contact.company}</p>
                        )}
                      </div>
                      <span className="text-zinc-600 text-xs">
                        {new Date(contact.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{contact.message}</p>
                  </div>
                ))}
              </div>
            )}
          </OSCard>
        )}

        {/* Content Editor Tabs */}
        {(activeTab === "hero" || activeTab === "about" || activeTab === "social" || activeTab === "seo" || activeTab === "partnerships" || activeTab === "media-kit") && (
          <div className="space-y-6">
            {/* Hero Section Editor */}
            {activeTab === "hero" && siteContent && (
              <OSCard>
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-[#CC785C]" />
                  Hero Section
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Title</label>
                    <input
                      type="text"
                      value={siteContent.hero.title}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, title: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={siteContent.hero.subtitle}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, subtitle: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Description</label>
                    <textarea
                      value={siteContent.hero.description}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, description: e.target.value }
                      })}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Profile Image Path</label>
                    <input
                      type="text"
                      value={siteContent.hero.image}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: { ...siteContent.hero, image: e.target.value }
                      })}
                      placeholder="/profile.jpg"
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                    <p className="text-zinc-600 text-xs mt-2 font-mono">
                      Upload image to /public folder first
                    </p>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Typewriter Words (comma-separated)</label>
                    <input
                      type="text"
                      value={siteContent.hero.typewriterWords.join(", ")}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        hero: {
                          ...siteContent.hero,
                          typewriterWords: e.target.value.split(",").map(w => w.trim())
                        }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <button
                    onClick={saveSiteContent}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save Hero Section"}
                  </button>
                </div>
              </OSCard>
            )}

            {/* About Page Editor */}
            {activeTab === "about" && siteContent && (
              <OSCard>
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#CC785C]" />
                  About Page
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Page Title</label>
                    <input
                      type="text"
                      value={siteContent.about.title}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, title: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Biography</label>
                    <textarea
                      value={siteContent.about.bio}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, bio: e.target.value }
                      })}
                      rows={8}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Mission Statement</label>
                    <textarea
                      value={siteContent.about.mission}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, mission: e.target.value }
                      })}
                      rows={2}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Followers</label>
                      <input
                        type="text"
                        value={siteContent.about.stats.followers}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            stats: { ...siteContent.about.stats, followers: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Resources</label>
                      <input
                        type="text"
                        value={siteContent.about.stats.resources}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            stats: { ...siteContent.about.stats, resources: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Impressions</label>
                      <input
                        type="text"
                        value={siteContent.about.stats.impressions}
                        onChange={(e) => setSiteContent({
                          ...siteContent,
                          about: {
                            ...siteContent.about,
                            stats: { ...siteContent.about.stats, impressions: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveSiteContent}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save About Page"}
                  </button>
                </div>
              </OSCard>
            )}

            {/* Social Links Editor */}
            {activeTab === "social" && siteContent && (
              <OSCard>
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3">
                  <Share2 className="w-6 h-6 text-[#CC785C]" />
                  Social Links
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Instagram URL</label>
                    <input
                      type="text"
                      value={siteContent.social.instagram}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        social: { ...siteContent.social, instagram: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={siteContent.social.email}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        social: { ...siteContent.social, email: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Website URL</label>
                    <input
                      type="text"
                      value={siteContent.social.website}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        social: { ...siteContent.social, website: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <button
                    onClick={saveSiteContent}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save Social Links"}
                  </button>
                </div>
              </OSCard>
            )}

            {/* SEO Settings Editor */}
            {activeTab === "seo" && siteContent && (
              <OSCard>
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3">
                  <Search className="w-6 h-6 text-[#CC785C]" />
                  SEO Settings
                </h2>
                
                <div className="space-y-6">
                  {Object.entries(siteContent.seo).map(([page, data]) => (
                    <div key={page} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <h3 className="font-mono text-sm text-[#CC785C] uppercase mb-4">
                        {page} Page
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-zinc-400 text-sm mb-2">Meta Title</label>
                          <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              seo: {
                                ...siteContent.seo,
                                [page]: { ...data, title: e.target.value }
                              }
                            })}
                            className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-400 text-sm mb-2">Meta Description</label>
                          <textarea
                            value={data.description}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              seo: {
                                ...siteContent.seo,
                                [page]: { ...data, description: e.target.value }
                              }
                            })}
                            rows={2}
                            className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-400 text-sm mb-2">Keywords</label>
                          <input
                            type="text"
                            value={data.keywords}
                            onChange={(e) => setSiteContent({
                              ...siteContent,
                              seo: {
                                ...siteContent.seo,
                                [page]: { ...data, keywords: e.target.value }
                              }
                            })}
                            className="w-full px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={saveSiteContent}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save SEO Settings"}
                  </button>
                </div>
              </OSCard>
            )}

            {/* Partnership Logos Editor */}
            {activeTab === "partnerships" && siteContent && (
              <OSCard>
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-[#CC785C]" />
                  Partnership Page
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Heading</label>
                    <input
                      type="text"
                      value={siteContent.partnerships.heading}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        partnerships: { ...siteContent.partnerships, heading: e.target.value }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Subheading</label>
                    <textarea
                      value={siteContent.partnerships.subheading}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        partnerships: { ...siteContent.partnerships, subheading: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-3">Past Partners</label>
                    <div className="space-y-3">
                      {siteContent.partnerships.pastPartners.map((partner, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="text"
                            value={partner.name}
                            onChange={(e) => {
                              const updated = [...siteContent.partnerships.pastPartners];
                              updated[index] = { ...partner, name: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                partnerships: { ...siteContent.partnerships, pastPartners: updated }
                              });
                            }}
                            placeholder="Partner Name"
                            className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                          />
                          <input
                            type="text"
                            value={partner.url}
                            onChange={(e) => {
                              const updated = [...siteContent.partnerships.pastPartners];
                              updated[index] = { ...partner, url: e.target.value };
                              setSiteContent({
                                ...siteContent,
                                partnerships: { ...siteContent.partnerships, pastPartners: updated }
                              });
                            }}
                            placeholder="URL (optional)"
                            className="flex-1 px-4 py-2 bg-[#0a0a0a] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={saveSiteContent}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save Partnerships"}
                  </button>
                </div>
              </OSCard>
            )}

            {/* Media Kit Editor */}
            {activeTab === "media-kit" && mediaKitData && (
              <OSCard>
                <h2 className="font-heading text-2xl text-white mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#CC785C]" />
                  Media Kit Data
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Followers</label>
                      <input
                        type="text"
                        value={mediaKitData.followers}
                        onChange={(e) => setMediaKitData({ ...mediaKitData, followers: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Monthly Impressions</label>
                      <input
                        type="text"
                        value={mediaKitData.impressions}
                        onChange={(e) => setMediaKitData({ ...mediaKitData, impressions: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Audience Age</label>
                      <input
                        type="text"
                        value={mediaKitData.audienceAge}
                        onChange={(e) => setMediaKitData({ ...mediaKitData, audienceAge: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Engagement Rate</label>
                    <input
                      type="text"
                      value={mediaKitData.engagementRate}
                      onChange={(e) => setMediaKitData({ ...mediaKitData, engagementRate: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Male %</label>
                      <input
                        type="text"
                        value={mediaKitData.demographics.gender.male}
                        onChange={(e) => setMediaKitData({
                          ...mediaKitData,
                          demographics: {
                            ...mediaKitData.demographics,
                            gender: { ...mediaKitData.demographics.gender, male: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 font-mono text-sm mb-2">Female %</label>
                      <input
                        type="text"
                        value={mediaKitData.demographics.gender.female}
                        onChange={(e) => setMediaKitData({
                          ...mediaKitData,
                          demographics: {
                            ...mediaKitData.demographics,
                            gender: { ...mediaKitData.demographics.gender, female: e.target.value }
                          }
                        })}
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Top Locations (comma-separated)</label>
                    <input
                      type="text"
                      value={mediaKitData.demographics.topLocations.join(", ")}
                      onChange={(e) => setMediaKitData({
                        ...mediaKitData,
                        demographics: {
                          ...mediaKitData.demographics,
                          topLocations: e.target.value.split(",").map((l: string) => l.trim())
                        }
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Top Interests (comma-separated)</label>
                    <input
                      type="text"
                      value={mediaKitData.topInterests.join(", ")}
                      onChange={(e) => setMediaKitData({
                        ...mediaKitData,
                        topInterests: e.target.value.split(",").map((i: string) => i.trim())
                      })}
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-mono text-sm mb-2">Last Updated</label>
                    <input
                      type="text"
                      value={mediaKitData.lastUpdated}
                      onChange={(e) => setMediaKitData({ ...mediaKitData, lastUpdated: e.target.value })}
                      placeholder="April 2025"
                      className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#CC785C]/50"
                    />
                  </div>

                  <button
                    onClick={saveMediaKit}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-b from-[#CC785C] to-[#b8674a] text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(204,120,92,0.4)] transition-all"
                  >
                    <Save size={18} />
                    {isLoading ? "Saving..." : "Save Media Kit"}
                  </button>
                </div>
              </OSCard>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
