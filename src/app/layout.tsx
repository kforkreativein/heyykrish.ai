import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteConfig = {
  name: "HeyyKrish.AI",
  description: "Free AI workflows, ChatGPT prompts, and automation templates from Krish Chhatrala. Every tool mentioned on @heyykrish.ai Instagram — organized and ready to use.",
  url: "https://www.heyykrish.site",
  ogImage: "/og-image.png",
  creator: "Krish Chhatrala",
  instagram: "@heyykrish.ai",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - AI Resources & Tools`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI workflows",
    "ChatGPT prompts",
    "automation templates",
    "AI tools",
    "Krish Chhatrala",
    "heyykrish",
    "free AI resources",
    "productivity automation",
    "NotebookLM",
    "Claude AI",
  ],
  authors: [{ name: siteConfig.creator, url: siteConfig.url }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - AI Resources & Tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.instagram,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Krish Chhatrala",
              alternateName: "heyykrish",
              url: "https://heyykrish.ai",
              image: "https://heyykrish.ai/og-image.png",
              sameAs: [
                "https://instagram.com/heyykrish.ai",
              ],
              jobTitle: "AI Content Creator",
              description: "AI workflows, ChatGPT prompts, and automation templates",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex bg-[#0a0a0a] text-zinc-300 antialiased w-full max-w-[100vw] overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full overflow-x-hidden lg:ml-[276px] min-h-screen">
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
