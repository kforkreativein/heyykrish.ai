import BottomCTA from "@/components/BottomCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 pt-8 lg:pt-16 pb-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <h1 className="text-3xl lg:text-4xl font-bold text-zinc-50 mb-8 tracking-tight">
          About Krish
        </h1>

        {/* Lead Paragraph */}
        <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed mb-8 font-medium">
          I&apos;m an AI creator helping people <strong className="text-[#E17F62]">work smarter, not harder</strong>. I believe
          the best AI tools should be accessible to everyone—not locked behind
          expensive subscriptions or gatekept by &quot;gurus.&quot;
        </p>

        {/* Body Content */}
        <div className="space-y-6">
          <p className="text-zinc-400 leading-relaxed">
            My journey started with <span className="text-[#E17F62] font-medium">K for Kreative</span>, where I explored the
            intersection of creativity and technology. As AI tools evolved, I
            realized they weren&apos;t just changing how we create—they were
            redefining what&apos;s possible for independent creators and small teams.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            That realization led to <span className="text-zinc-50 font-medium">heyykrish.ai</span>. This isn&apos;t a course platform or
            a paid community. It&apos;s a resource hub where I share everything I
            learn about AI tools—prompts, workflows, automations, and
            tutorials—completely free. No gatekeeping, no upsells, just
            practical knowledge you can use today.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            I spend hours testing AI tools so you don&apos;t have to. <strong className="text-[#E17F62]">When I find
            something that actually works</strong>, I break it down and share it here.
            When something is overhyped garbage, I&apos;ll tell you that too.
          </p>
          
          {/* Callout Box */}
          <div className="my-8 border-l-2 border-[#E17F62] bg-zinc-900/50 px-6 py-4 italic">
            <p className="text-zinc-300 leading-relaxed">
              &quot;The best AI tools aren&apos;t the ones with the flashiest demos. 
              They&apos;re the ones that save you time, reduce friction, and actually 
              integrate into your workflow.&quot;
            </p>
          </div>

          <h2 className="text-xl font-semibold text-zinc-50 mt-12 mb-4">
            The Mission
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            My goal is simple: <span className="text-[#E17F62] font-medium">democratize access to AI knowledge</span>. The people
            who benefit most from these tools shouldn&apos;t just be tech companies
            and enterprise teams. Creators, freelancers, small business
            owners—everyone deserves to leverage AI in their work.
          </p>

          <p className="text-zinc-400 leading-relaxed">
            Whether you&apos;re looking to automate repetitive tasks, create content
            faster, or just understand what all the AI hype is about, you&apos;re in
            the right place.
          </p>

          <h2 className="text-xl font-semibold text-zinc-50 mt-12 mb-4">
            Let&apos;s Connect
          </h2>

          <p className="text-zinc-400 leading-relaxed">
            The best ideas come from conversations. Follow me on Instagram and
            TikTok for daily AI tips, or join my newsletter for weekly deep
            dives. Have a question or just want to say hi? My DMs are always
            open.
          </p>
        </div>
        
        {/* Bottom CTA */}
        <BottomCTA
          badge="Let's Connect"
          heading="Ready to level up your AI game?"
          subtext="Join 10,000+ creators getting my weekly AI breakdown. Real tools, real workflows, zero fluff."
          buttonText="Join the Newsletter"
          buttonHref="/#newsletter"
        />
      </div>
    </div>
  );
}
