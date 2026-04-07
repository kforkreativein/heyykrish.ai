import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "HeyyKrish.AI - Free AI Workflows, Prompts & Tools",
  description: "Stop learning AI, start deploying it. Get free ChatGPT prompts, automation templates, and AI workflows from Krish Chhatrala. Every tool mentioned on @heyykrish.ai Instagram.",
  openGraph: {
    title: "HeyyKrish.AI - Free AI Workflows, Prompts & Tools",
    description: "Stop learning AI, start deploying it. Get free ChatGPT prompts, automation templates, and AI workflows from Krish Chhatrala.",
    type: "website",
  },
};

export default function Home() {
  return <HomeContent />;
}
