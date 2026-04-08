import type { Metadata } from "next";
import BottomCTA from "@/components/BottomCTA";
import OSCard from "@/components/OSCard";

export const metadata: Metadata = {
  title: "About Krish Chhatrala",
  description: "AI content creator helping founders and creators deploy productivity tools without the technical jargon. 150K+ Instagram followers learning AI workflows daily.",
  openGraph: {
    title: "About Krish Chhatrala | HeyyKrish.AI",
    description: "AI content creator helping founders and creators deploy productivity tools without the technical jargon.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16 lg:pt-8 pb-16 px-4 lg:px-8 relative overflow-hidden w-full max-w-[100vw] animate-page-enter">
      {/* Ambient Background Glow with float animation */}
      <div 
        className="absolute top-[-10%] left-[10%] md:left-[20%] w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-[#FF6A25]/10 rounded-full blur-[120px] -z-10 pointer-events-none animate-float"
        aria-hidden="true"
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 animate-fade-up">
          <div className="font-mono text-xs tracking-widest text-[#FF6A25] mb-4 uppercase">
            Heyykrish.AI // About
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Hey, I'm Krish
          </h1>
        </div>

        {/* Main Content in OSCard */}
        <OSCard className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed mb-8 font-medium">
            I help creators and founders cut through the AI noise and deploy tools that actually boost productivity—without the technical jargon.
          </p>

          {/* Body Content */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-semibold text-zinc-50 mt-8 mb-4">
              Why I Started This
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              While running my marketing agency, K for Kreative, I realized most "AI gurus" don't actually use the tools they preach about. I needed real solutions to scale my own workflows, so I started testing everything myself.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              Hundreds of hours later, I found that most tools were overhyped garbage—but a few were genuinely game-changing. That's when heyykrish.ai was born: to separate the signal from the noise and share the exact systems that work.
            </p>
            
            {/* Callout Box */}
            <div className="my-8 border-l-2 border-[#FF6A25] bg-black/30 px-6 py-4 italic rounded-r-2xl">
              <p className="text-zinc-300 leading-relaxed">
                "The best AI tools aren't the ones with flashy demos. They're the ones that save you time, reduce friction, and actually fit into your workflow."
              </p>
            </div>

            <h2 className="font-heading text-2xl font-semibold text-zinc-50 mt-12 mb-4">
              What You'll Find Here
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              This isn't a gated course. Just practical, battle-tested resources you can deploy today:
            </p>

            <ul className="list-disc list-inside text-zinc-400 space-y-2 ml-2 sm:ml-4">
              <li><strong className="text-zinc-300">ChatGPT prompts</strong> that get better results in less time</li>
              <li><strong className="text-zinc-300">Automation workflows</strong> to eliminate repetitive tasks</li>
              <li><strong className="text-zinc-300">Tool comparisons</strong> so you know what's worth your money</li>
              <li><strong className="text-zinc-300">Step-by-step guides</strong> for beginners (no coding required)</li>
            </ul>

            <p className="text-zinc-400 leading-relaxed mt-6">
              When I find something that actually works, I break it down and share it here. When something is overhyped, I'll tell you that too.
            </p>

            <h2 className="font-heading text-2xl font-semibold text-zinc-50 mt-12 mb-4">
              Let's Connect
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Follow me on <a href="https://instagram.com/heyykrish" target="_blank" rel="noopener noreferrer" className="text-[#FF6A25] hover:underline">Instagram</a> for daily AI tips, or join my newsletter for in-depth breakdowns every Tuesday. Questions? My DMs are always open.
            </p>
          </div>
        </OSCard>
        
        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-24 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <BottomCTA
            badge="Let's Connect"
            heading="Ready to level up your AI game?"
            subtext="Join creators getting my weekly AI breakdown. Real tools, real workflows, zero fluff."
            buttonText="Join the Newsletter"
            buttonHref="/#newsletter"
            useModal={true}
          />
        </div>
      </div>
    </div>
  );
}
