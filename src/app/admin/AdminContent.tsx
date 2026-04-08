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
  EyeOff
} from "lucide-react";
import OSCard from "@/components/OSCard";

// Simple password protection (not secure for production - just a placeholder)
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

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

export default function AdminContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "subscribers" | "contacts" | "downloads">("overview");
  const [stats, setStats] = useState<Stats>({ newsletterCount: 0, contactCount: 0, downloadCount: 0 });
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      // Store in session storage
      sessionStorage.setItem("admin_auth", "true");
    } else {
      setError("Invalid password");
    }
  };

  // Check session storage on mount
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === "subscribers") {
      fetchSubscribers();
    } else if (isAuthenticated && activeTab === "contacts") {
      fetchContacts();
    }
  }, [isAuthenticated, activeTab]);

  const exportToCSV = (data: object[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map(row => 
        headers.map(header => {
          const value = (row as Record<string, unknown>)[header];
          // Escape quotes and wrap in quotes if contains comma
          const stringValue = String(value ?? "");
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <OSCard className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FF6A25]/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-[#FF6A25]" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-zinc-400 text-sm">
              Enter your password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6A25] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-b from-[#FF6A25] to-[#FF6A25] text-black font-semibold rounded-xl hover:shadow-[0_0_25px_rgba(255,106,37,0.5)] transition-all duration-300"
            >
              Access Dashboard
            </button>
          </form>
        </OSCard>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 w-full max-w-[100vw] animate-page-enter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs tracking-widest text-[#FF6A25] mb-2 uppercase">
              Heyykrish.AI // Admin
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Dashboard
            </h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_auth");
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <OSCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FF6A25]/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-[#FF6A25]" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Newsletter Subscribers</p>
              <p className="font-heading text-2xl font-bold text-white">
                {isLoading ? "..." : stats.newsletterCount}
              </p>
            </div>
          </OSCard>

          <OSCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Contact Inquiries</p>
              <p className="font-heading text-2xl font-bold text-white">
                {isLoading ? "..." : stats.contactCount}
              </p>
            </div>
          </OSCard>

          <OSCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
              <Download className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Download Leads</p>
              <p className="font-heading text-2xl font-bold text-white">
                {isLoading ? "..." : stats.downloadCount}
              </p>
            </div>
          </OSCard>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(["overview", "subscribers", "contacts", "downloads"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#FF6A25] text-black"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <OSCard>
          {activeTab === "overview" && (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Analytics Coming Soon
              </h3>
              <p className="text-zinc-400 max-w-md mx-auto">
                Detailed analytics dashboard with charts, trends, and insights will be available in a future update.
              </p>
            </div>
          )}

          {activeTab === "subscribers" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold text-white">
                  Newsletter Subscribers
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={fetchSubscribers}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
                    disabled={isLoading}
                  >
                    <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                  </button>
                  <button
                    onClick={() => exportToCSV(subscribers, "subscribers")}
                    className="px-3 py-1.5 text-sm bg-white/5 text-zinc-300 rounded-lg hover:bg-white/10"
                    disabled={subscribers.length === 0}
                  >
                    Export CSV
                  </button>
                </div>
              </div>
              
              {subscribers.length === 0 ? (
                <p className="text-zinc-500 text-center py-8">No subscribers yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left py-3 px-2 text-zinc-400 font-medium">Email</th>
                        <th className="text-left py-3 px-2 text-zinc-400 font-medium">Name</th>
                        <th className="text-left py-3 px-2 text-zinc-400 font-medium">Source</th>
                        <th className="text-left py-3 px-2 text-zinc-400 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="border-b border-white/5">
                          <td className="py-3 px-2 text-white">{sub.email}</td>
                          <td className="py-3 px-2 text-zinc-400">{sub.name || "-"}</td>
                          <td className="py-3 px-2 text-zinc-400">{sub.source}</td>
                          <td className="py-3 px-2 text-zinc-500">
                            {new Date(sub.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "contacts" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-lg font-semibold text-white">
                  Contact Inquiries
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={fetchContacts}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5"
                    disabled={isLoading}
                  >
                    <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                  </button>
                  <button
                    onClick={() => exportToCSV(contacts, "contacts")}
                    className="px-3 py-1.5 text-sm bg-white/5 text-zinc-300 rounded-lg hover:bg-white/10"
                    disabled={contacts.length === 0}
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              {contacts.length === 0 ? (
                <p className="text-zinc-500 text-center py-8">No contact inquiries yet</p>
              ) : (
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-3 text-sm">
                        <span className="text-white font-medium">{contact.name}</span>
                        <span className="text-zinc-400">{contact.email}</span>
                        {contact.company && (
                          <span className="text-zinc-500">{contact.company}</span>
                        )}
                        <span className="text-zinc-600">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {contact.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "downloads" && (
            <div className="text-center py-12">
              <Download className="w-16 h-16 mx-auto text-zinc-600 mb-4" />
              <h3 className="font-heading text-xl font-semibold text-white mb-2">
                Download Leads
              </h3>
              <p className="text-zinc-400 max-w-md mx-auto">
                Track who downloaded your resources. This feature is coming soon.
              </p>
            </div>
          )}
        </OSCard>
      </div>
    </div>
  );
}
