import type { Metadata } from "next";
import ResourcesContent from "@/components/ResourcesContent";

export const metadata: Metadata = {
  title: "AI Resources & Tools",
  description: "Free AI workflows, ChatGPT prompts, and automation templates. Every tool mentioned on @heyykrish.ai Instagram—documented and ready to deploy.",
  openGraph: {
    title: "AI Resources & Tools | HeyyKrish.AI",
    description: "Free AI workflows, ChatGPT prompts, and automation templates ready to deploy.",
  },
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
