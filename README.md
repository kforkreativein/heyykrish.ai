# heyykrish.ai

Personal brand website and AI resource hub for Krish Chhatrala (@heyykrish.ai). A modern Next.js application showcasing AI workflows, ChatGPT prompts, and automation tools.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Development
```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🏗️ Architecture

### Tech Stack
- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Font:** Inter (Google Fonts)
- **Deployment:** Vercel

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with hero & featured resources
│   ├── layout.tsx         # Global layout with sidebar
│   ├── globals.css        # Global styles & design tokens
│   ├── resources/         # Resource hub
│   │   ├── page.tsx       # Resources list with search/filters
│   │   └── [slug]/        # Dynamic resource detail pages
│   ├── about/             # About page
│   └── brand-partnerships/# Brand partnerships & media kit
├── components/            # Reusable React components
│   ├── Sidebar.tsx        # Fixed navigation sidebar
│   ├── ResourceCard.tsx   # Resource display card
│   ├── TypewriterText.tsx # Animated typewriter effect
│   └── BottomCTA.tsx      # Reusable CTA component
└── data/
    └── resources.ts       # Resource database & utilities
```

## 🎨 Design System

### Color Palette
- **Background:** `#09090b` (zinc-950)
- **Cards:** `#18181b` (zinc-900)
- **Borders:** `#27272a` (zinc-800)
- **Accent:** `#E17F62` (coral/orange for CTAs)
- **Text Primary:** `#fafafa` (zinc-50)
- **Text Secondary:** `#a1a1aa` (zinc-400)

### Features
- Premium dark theme with subtle gradients
- Responsive design (mobile-first)
- Ambient glowing effects
- Smooth animations and transitions
- Accessibility-first component design

## 📚 Adding Resources

Resources are stored in `/src/data/resources.ts` as a TypeScript array.

### Add a New Resource
1. Edit `/src/data/resources.ts`
2. Add to the `resources` array:
```typescript
{
  id: "12",
  slug: "my-resource-slug",
  title: "Resource Title (Max 5 words)",
  description: "Brief 2-3 sentence summary",
  category: "Prompts" | "Tools" | "Video Editing" | "Marketing" | "Automations" | "Learning",
  publishedAt: "2026-04-04",
  featured: true, // Optional: shows on homepage
  downloadUrl: "/downloads/[slug].pdf", // Optional: PDF download link
  contentHtml: `<h3>Content</h3><p>Rich HTML content...</p>` // Optional: detailed content
}
```

3. Run `npm run build` to regenerate static pages

## 🚀 Deployment

### Deploy to Vercel (Recommended)
The easiest way to deploy heyykrish.ai is on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

**Setup Steps:**
1. Push code to GitHub (✅ Already done)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your GitHub repository
4. Vercel will auto-detect Next.js configuration
5. Click "Deploy"

Your site will be live on `https://heyykrish-ai.vercel.app` (custom domain: `heyykrish.ai`)

**Configure Custom Domain:**
1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)
4. SSL certificate auto-provisioned

### Environment Variables
No environment variables required for basic deployment. For future features (newsletter, analytics, etc.):
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.heyykrish.ai
```

## 🔒 Security

This project includes:
- ✅ Security headers (X-Frame-Options, CSP prep)
- ✅ React auto-escaping (XSS protection)
- ✅ Trusted content only (no user-generated content)
- ✅ No hardcoded secrets

See [SECURITY-AUDIT.md](./SECURITY-AUDIT.md) for full security report.

## 📦 What's Included

- **11+ Resource Pages** with rich content and download PDFs
- **Searchable Resource Hub** with category filtering
- **Dynamic Routing** for SSG (Static Site Generation)
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Premium Dark Theme** inspired by Apple & high-end creator platforms

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Run ESLint
```

## 📄 Documentation

- [AGENTS.md](./AGENTS.md) - Copilot agent instructions & workflows
- [CLAUDE.md](./CLAUDE.md) - Project memory & guidelines
- [SECURITY-AUDIT.md](./SECURITY-AUDIT.md) - Security analysis
- [ENHANCEMENT-SUMMARY.md](./ENHANCEMENT-SUMMARY.md) - Recent updates

## 🤝 Contributing

This is a personal brand project. For suggestions or improvements, open an issue on GitHub.

## 📱 Connect

- 🎥 Instagram: [@heyykrish.ai](https://instagram.com/heyykrish)
- 💻 Website: [heyykrish.ai](https://heyykrish.ai)
- 📧 Email: hello@heyykrish.ai

## 📜 License

This project is private. All rights reserved to Krish Chhatrala.

---

Built with Next.js, Tailwind CSS, and ❤️ using Vercel's platform.
