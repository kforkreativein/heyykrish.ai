import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "heyykrish.ai - AI Resources & Tools",
  description: "All my AI workflows, prompts, and automation templates for free. Every single one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex bg-[#0a0a0a] text-zinc-300 antialiased w-full max-w-[100vw] overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full overflow-x-hidden lg:ml-[276px] min-h-screen">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
